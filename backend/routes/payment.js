import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv'; // <-- Add this line
import Payment from '../models/Payment.js';
import OrderInfo from '../models/OrderInfo.js';

// Ensure environment variables are loaded before using them
dotenv.config(); // <-- Add this line

const router = express.Router();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ROUTE 1 : Create Order Api Using POST Method http://localhost:4000/api/payment/order
router.post('/order', (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }
        
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json({ data: order });
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})

// ROUTE 2 : Create Verify Api Using POST Method http://localhost:4000/api/payment/verify
router.post('/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");
        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });
            await payment.save();

            // Update order status to 'placed'
            await OrderInfo.findOneAndUpdate(
                { razorpay_order_id },
                { status: "placed" }
            );

            res.json({
                message: "Payement Successfully"
            });
        } else {
            res.status(400).json({ message: "Payment verification failed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
})

// Save user info before payment (status: pending)
router.post('/userinfo', async (req, res) => {
    try {
        const { name, email, phone, address, cart, total } = req.body;
        if (!name || !email || !phone || !address || !cart || !total) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Save with status 'pending'
        const orderInfo = new OrderInfo({ name, email, phone, address, cart, total, status: "pending" });
        await orderInfo.save();
        res.status(201).json({ message: "User info saved", orderId: orderInfo._id });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

// Mark order as failed (user left payment page)
router.post('/order-failed', async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) return res.status(400).json({ message: "Order ID required" });
        const order = await OrderInfo.findByIdAndUpdate(orderId, { status: "failed" }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order marked as failed", order });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

// Mark order as placed (on payment success)
router.post('/order-success', async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) return res.status(400).json({ message: "Order ID required" });
        const order = await OrderInfo.findByIdAndUpdate(orderId, { status: "placed" }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order marked as placed", order });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

// Fetch latest order for a user by email
router.get('/latest-order', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: "Email required" });
        // Find the latest order for this email
        const order = await OrderInfo.findOne({ email }).sort({ date: -1 });
        if (!order) return res.status(404).json({ message: "No order found" });
        res.json({ order });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

// Fetch all previous orders for a user by email
router.get('/all-orders', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: "Email required" });
        // Find all orders for this email, sorted by date descending
        const orders = await OrderInfo.find({ email }).sort({ date: -1 });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});

export default router;