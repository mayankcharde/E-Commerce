import express from "express";
const router = express.Router();
import NewsletterSubscriber from "../models/NewsletterSubscriber.js";

// POST /api/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  // Log the incoming request for debugging
  console.log("Newsletter subscribe request:", req.body);

  if (!email || !/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ message: "Please provide a valid email." });
  }
  try {
    // Prevent duplicate subscriptions
    const exists = await NewsletterSubscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already subscribed." });
    }
    await NewsletterSubscriber.create({ email });
    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

export default router;
