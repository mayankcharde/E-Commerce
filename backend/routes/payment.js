import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";
import OrderInfo from "../models/OrderInfo.js";

// Ensure environment variables are loaded
dotenv.config();

const router = express.Router();

// Initialize Razorpay with error checking and env mismatch detection
const initializeRazorpay = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

  console.log("🔍 [Razorpay Init] checking environment variables...");
  console.log("🔍 [Razorpay Init] process.env.RAZORPAY_KEY_ID:", key_id ? `Loaded (${key_id.substring(0, 10)}...)` : "MISSING");
  console.log("🔍 [Razorpay Init] process.env.RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET ? "Loaded" : "MISSING");
  console.log("🔍 [Razorpay Init] process.env.RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "MISSING");

  if (!key_id || !key_secret) {
    console.error("❌ [Razorpay Init Error] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET/RAZORPAY_SECRET not configured");
    throw new Error("Razorpay credentials not configured");
  }

  // Detect Live/Test mismatch
  const isKeyLive = key_id.startsWith("rzp_live_");
  const isSecretLive = key_secret.startsWith("rzp_live_") || (process.env.RAZORPAY_SECRET && process.env.RAZORPAY_SECRET.startsWith("rzp_live_"));
  const isKeyTest = key_id.startsWith("rzp_test_");
  
  if (isKeyLive && !key_id.startsWith("rzp_live_")) {
    console.warn("⚠️ [Razorpay Init Warning] Key ID does not match expected format.");
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
    "✅ Razorpay initialized successfully with key prefix:",
    process.env.RAZORPAY_KEY_ID?.substring(0, 12)
  );
} catch (err) {
  console.error("❌ Razorpay initialization error:", err.message);
}

// ROUTE 1: Create Order API
// POST /api/payment/order
router.post("/order", async (req, res) => {
  const { amount } = req.body;

  console.log("📝 Incoming Request to /api/payment/order. Body:", req.body);
  console.log("Key Loaded:", !!process.env.RAZORPAY_KEY_ID);
  console.log("Secret Loaded:", !!(process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET));
  console.log("Amount:", amount);

  try {
    if (!amount) {
      console.warn("⚠️ Amount is missing from request body");
      return res.status(400).json({
        message: "Amount is required",
        success: false,
      });
    }

    const amountInRupees = Number(amount);
    if (!Number.isFinite(amountInRupees) || amountInRupees <= 0) {
      console.warn("⚠️ Invalid amount provided:", amount);
      return res.status(400).json({
        message: "Invalid amount. Must be a positive number",
        success: false,
      });
    }

    if (!razorpayInstance) {
      console.error("❌ Cannot create order: Razorpay instance is not initialized");
      throw new Error("Razorpay not initialized");
    }

    const options = {
      amount: Math.round(amountInRupees * 100), // Convert to paise
      currency: "INR",
      receipt: `receipt_${crypto.randomBytes(10).toString("hex")}`,
    };

    console.log("🔍 Creating Razorpay order with options:", options);

    const order = await razorpayInstance.orders.create(options);

    console.log("✅ Razorpay Order created successfully:", order);

    return res.status(200).json({
      data: order,
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("❌ Exception caught in /api/payment/order:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error during order creation",
      error: error?.message,
      stack: error?.stack,
      rawError: error
    });
  }
});

// ROUTE 2: Verify Payment API
// POST /api/payment/verify
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  console.log("🔐 Incoming Request to /api/payment/verify. Body:", {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature: razorpay_signature ? "Present" : "Missing",
  });

  try {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.warn("⚠️ Missing payment verification data in request");
      return res.status(400).json({
        message: "Missing payment verification data",
        success: false,
      });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const secret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;
    
    if (!secret) {
      throw new Error("Razorpay secret key not configured on backend");
    }

    const expectedSign = crypto
      .createHmac("sha256", secret)
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;

    console.log("🔍 Signature verification check:", { isAuthentic, expectedSign: expectedSign.substring(0, 10) + "...", razorpay_signature: razorpay_signature.substring(0, 10) + "..." });

    if (isAuthentic) {
      // Save payment record
      const payment = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      await payment.save();

      console.log("✅ Payment record saved in MongoDB:", payment._id);

      // Update order status to 'placed'
      const updatedOrder = await OrderInfo.findOneAndUpdate(
        { razorpay_order_id },
        { status: "placed", razorpay_payment_id },
        { new: true },
      );

      console.log("✅ Order status updated in MongoDB:", updatedOrder);

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
    console.error("❌ Exception caught in /api/payment/verify:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error during payment verification",
      error: error?.message,
      stack: error?.stack,
    });
  }
});

// ROUTE 3: Save user info before payment
// POST /api/payment/userinfo
router.post("/userinfo", async (req, res) => {
  try {
    const { name, email, phone, address, cart, total } = req.body;

    console.log("📝 Incoming Request to /api/payment/userinfo. Body:", {
      name,
      email,
      phone,
      address,
      total,
      cartLength: cart ? cart.length : 0,
    });

    if (!name || !email || !phone || !address || !cart || total === undefined) {
      console.warn("⚠️ Missing fields in user info request");
      return res.status(400).json({
        message:
          "All fields are required (name, email, phone, address, cart, total)",
        success: false,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn("⚠️ Invalid email format:", email);
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // Validate phone (basic check for Indian phone)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      console.warn("⚠️ Invalid phone number format:", phone);
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

    console.log("✅ OrderInfo (pending) saved in MongoDB ID:", savedOrder._id);

    return res.status(201).json({
      message: "User info saved successfully",
      success: true,
      orderId: savedOrder._id,
      data: savedOrder,
    });
  } catch (error) {
    console.error("❌ Exception caught in /api/payment/userinfo:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error during user info save",
      error: error?.message,
      stack: error?.stack,
    });
  }
});

// ROUTE 4: Mark order as failed
// POST /api/payment/order-failed
router.post("/order-failed", async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log("📝 Incoming Request to /api/payment/order-failed. Body:", req.body);

    if (!orderId) {
      console.warn("⚠️ Missing orderId in order-failed request");
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
      console.warn("⚠️ Order not found for ID:", orderId);
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    console.log("✅ Order marked as failed in MongoDB:", orderId);

    return res.status(200).json({
      message: "Order marked as failed",
      success: true,
      order,
    });
  } catch (error) {
    console.error("❌ Exception caught in /api/payment/order-failed:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error during updating failed status",
      error: error?.message,
      stack: error?.stack,
    });
  }
});

// ROUTE 5: Mark order as placed
// POST /api/payment/order-success
router.post("/order-success", async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log("📝 Incoming Request to /api/payment/order-success. Body:", req.body);

    if (!orderId) {
      console.warn("⚠️ Missing orderId in order-success request");
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
      console.warn("⚠️ Order not found for ID:", orderId);
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }

    console.log("✅ Order marked as placed in MongoDB:", orderId);

    return res.status(200).json({
      message: "Order placed successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.error("❌ Exception caught in /api/payment/order-success:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error during updating placed status",
      error: error?.message,
      stack: error?.stack,
    });
  }
});

// ROUTE 6: Get latest order by email
// GET /api/payment/latest-order
router.get("/latest-order", async (req, res) => {
  try {
    const { email } = req.query;
    console.log("📝 Incoming GET Request to /api/payment/latest-order. Query:", req.query);

    if (!email) {
      console.warn("⚠️ Missing email in latest-order query");
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const order = await OrderInfo.findOne({ email }).sort({ createdAt: -1 });

    if (!order) {
      console.info("ℹ️ No orders found for email:", email);
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
    console.error("❌ Exception caught in /api/payment/latest-order:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error during latest order query",
      error: error?.message,
      stack: error?.stack,
    });
  }
});

// ROUTE 7: Get all orders by email
// GET /api/payment/all-orders
router.get("/all-orders", async (req, res) => {
  try {
    const { email } = req.query;
    console.log("📝 Incoming GET Request to /api/payment/all-orders. Query:", req.query);

    if (!email) {
      console.warn("⚠️ Missing email in all-orders query");
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const orders = await OrderInfo.find({ email }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      console.info("ℹ️ No orders found for email:", email);
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
    console.error("❌ Exception caught in /api/payment/all-orders:", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error during all orders query",
      error: error?.message,
      stack: error?.stack,
    });
  }
});

export default router;
