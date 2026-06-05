// backend/server.js - PRODUCTION READY
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import payment from "./routes/payment.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - Fix for Netlify production deployment
const corsOptions = {
  origin: [
    "http://localhost:3000", // Local development
    "http://localhost:5173", // Vite dev server
    "https://localhost:3000",
    "https://localhost:5173",
    "https://e-commerce-ten-ruddy-33.vercel.app/",
    process.env.FRONTEND_URL || "", // Production Netlify URL
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400, // 24 hours
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Test Routes
app.get("/", (req, res) => {
  res.json({
    message: "Razorpay Payment Gateway Using React And Node Js",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working ✅",
    timestamp: new Date().toISOString(),
  });
});

// Routes - Make sure these lines are present BEFORE MongoDB connection
app.use("/api/auth", authRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/payment", payment);
app.use("/api/contact", contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    success: false,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
    success: false,
  });
});

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    console.log("🔒 CORS Origins:", corsOptions.origin);
    console.log("📦 Environment:", process.env.NODE_ENV || "development");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        `🌍 Frontend URL configured: ${process.env.FRONTEND_URL || "Not set"}`,
      );
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

export default app;
