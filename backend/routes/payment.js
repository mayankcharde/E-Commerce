import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";
import OrderInfo from "../models/OrderInfo.js";

// Ensure environment variables are loaded
dotenv.config();

const router = express.Router();

// Initialize Razorpay with error checking
const initializeRazorpay = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_SECRET;

  if (!key_id || !key_secret) {
    console.error("❌ RAZORPAY_KEY_ID or RAZORPAY_SECRET not configured");
    throw new Error("Razorpay credentials not configured");
  }

  return new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });
};

let razorpayInstance;
try {
  razorpayInstance = initializeRazorpay();
  console.log(
    "✅ Razorpay initialized with key:",
    process.env.RAZORPAY_KEY_ID?.substring(0, 20) + "...",
  );
} catch (err) {
  console.error("❌ Razorpay initialization error:", err.message);
}

// ROUTE 1: Create Order API
// POST /api/payment/order
router.post("/order", async (req, res) => {
  const { amount } = req.body;

  console.log("📝 Order creation request:", { amount });

  try {
    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
        success: false,
      });
    }

    const amountInRupees = Number(amount);
    if (!Number.isFinite(amountInRupees) || amountInRupees <= 0) {
      return res.status(400).json({
        message: "Invalid amount. Must be a positive number",
        success: false,
      });
    }

    if (!razorpayInstance) {
      throw new Error("Razorpay not initialized");
    }

    const options = {
      amount: Math.round(amountInRupees * 100), // Convert to paise
      currency: "INR",
      receipt: `receipt_${crypto.randomBytes(10).toString("hex")}`,
    };

    console.log("🔍 Creating order with options:", options);

    const order = await razorpayInstance.orders.create(options);

    console.log("✅ Order created successfully:", order);

    return res.status(200).json({
      data: order,
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    const errorMessage =
      error?.error?.description ||
      error?.description ||
      error?.message ||
      "Internal Server Error";

    console.error("❌ Order creation error:", error);

    return res.status(500).json({
      message: errorMessage,
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// ROUTE 2: Verify Payment API
// POST /api/payment/verify
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log("🔐 Payment verification request:", {
    razorpay_order_id,
    razorpay_payment_id,
  });

  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: "Missing payment verification data",
        success: false,
      });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    console.log("🔍 Signature verification:", { isAuthentic });

    if (isAuthentic) {
      // Save payment record
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      await payment.save();

      console.log("✅ Payment saved successfully:", payment._id);

      // Update order status to 'placed'
      const updatedOrder = await OrderInfo.findOneAndUpdate(
        { razorpay_order_id },
        { status: "placed", razorpay_payment_id },
        { new: true },
      );

      console.log("✅ Order status updated:", updatedOrder);

      return res.status(200).json({
        message: "Payment verified successfully",
        success: true,
        data: {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        },
      });
    } else {
      console.warn("❌ Signature mismatch - invalid payment");
      return res.status(400).json({
        message: "Payment verification failed - invalid signature",
        success: false,
      });
    }
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return res.status(500).json({
      message: "Payment verification error",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// ROUTE 3: Save user info before payment
// POST /api/payment/userinfo
router.post("/userinfo", async (req, res) => {
  try {
    const { name, email, phone, address, cart, total } = req.body;

    console.log("📝 User info received:", {
      name,
      email,
      phone,
      address,
      total,
    });

    if (!name || !email || !phone || !address || !cart || total === undefined) {
      return res.status(400).json({
        message:
          "All fields are required (name, email, phone, address, cart, total)",
        success: false,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // Validate phone (basic check for Indian phone)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      return res.status(400).json({
        message: "Invalid phone number",
        success: false,
      });
    }

    const orderInfo = new OrderInfo({
      name,
      email,
      phone,
      address,
      cart,
      total,
      status: "pending",
      createdAt: new Date(),
    });

    const savedOrder = await orderInfo.save();

    console.log("✅ User info saved:", savedOrder._id);

    return res.status(201).json({
      message: "User info saved successfully",
      success: true,
      orderId: savedOrder._id,
      data: savedOrder,
    });
  } catch (error) {
    console.error("❌ User info save error:", error);
    return res.status(500).json({
      message: "Failed to save user information",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// ROUTE 4: Mark order as failed
// POST /api/payment/order-failed
router.post("/order-failed", async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
        success: false,
      });
    }

    const order = await OrderInfo.findByIdAndUpdate(
      orderId,
      {
        status: "failed",
        failedAt: new Date(),
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    console.log("✅ Order marked as failed:", orderId);

    return res.status(200).json({
      message: "Order marked as failed",
      success: true,
      order,
    });
  } catch (error) {
    console.error("❌ Order failure update error:", error);
    return res.status(500).json({
      message: "Failed to update order status",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// ROUTE 5: Mark order as placed
// POST /api/payment/order-success
router.post("/order-success", async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
        success: false,
      });
    }

    const order = await OrderInfo.findByIdAndUpdate(
      orderId,
      {
        status: "placed",
        placedAt: new Date(),
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    console.log("✅ Order marked as placed:", orderId);

    return res.status(200).json({
      message: "Order placed successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.error("❌ Order success update error:", error);
    return res.status(500).json({
      message: "Failed to update order status",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// ROUTE 6: Get latest order by email
// GET /api/payment/latest-order
router.get("/latest-order", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const order = await OrderInfo.findOne({ email }).sort({ createdAt: -1 });

    if (!order) {
      return res.status(404).json({
        message: "No orders found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("❌ Latest order fetch error:", error);
    return res.status(500).json({
      message: "Failed to fetch latest order",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// ROUTE 7: Get all orders by email
// GET /api/payment/all-orders
router.get("/all-orders", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const orders = await OrderInfo.find({ email }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "No orders found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("❌ All orders fetch error:", error);
    return res.status(500).json({
      message: "Failed to fetch orders",
      success: false,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
