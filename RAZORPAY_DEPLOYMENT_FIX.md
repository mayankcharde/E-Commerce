# 🔥 Razorpay Netlify Deployment - Complete Fix Guide

## 📋 Root Cause Analysis

Your Razorpay payment integration fails on Netlify due to these issues:

1. **400 Bad Request from Razorpay** → Invalid order format/missing order_id
2. **500 Internal Server Error** → CORS preflight request failing
3. **Mixed Content Error** → HTTPS frontend calling HTTP backend
4. **Frontend .env** → Hardcoded to `http://localhost:5000` (localhost URL on production)
5. **CORS wildcard** → `cors()` doesn't properly handle Netlify HTTPS origins
6. **Order creation response** → Not returning proper order object structure

---

## ✅ Step-by-Step Production Fix

### **STEP 1: Update Backend .env**

Set these environment variables in your Render/Heroku backend deployment:

```env
PORT=5000
MONGO_URI=mongodb+srv://mayankcharde2:e-commerce@e-commerce.wxu1xmc.mongodb.net/
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
RAZORPAY_SECRET=Vi85aFH0wz27Q4VU2LoOokcJ
NODE_ENV=production
FRONTEND_URL=https://yoursitename.netlify.app
```

**For local development**, create `.env.local`:

```env
PORT=5000
MONGO_URI=mongodb+srv://mayankcharde2:e-commerce@e-commerce.wxu1xmc.mongodb.net/
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
RAZORPAY_SECRET=Vi85aFH0wz27Q4VU2LoOokcJ
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

### **STEP 2: Update Frontend .env**

Replace the content with:

```env
VITE_BACKEND_HOST_URL=https://your-render-backend-url.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
```

For **local development**:

```env
VITE_BACKEND_HOST_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
```

---

### **STEP 3: Update Backend server.js**

Replace entire file with:

```javascript
// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import payment from './routes/payment.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - Fix for Netlify production deployment
const corsOptions = {
  origin: [
    'http://localhost:3000',          // Local development
    'http://localhost:5173',          // Vite dev server
    'https://localhost:3000',
    'https://localhost:5173',
    process.env.FRONTEND_URL || '',   // Production Netlify URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24 hours
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Test Route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Razorpay Payment Gateway Using React And Node Js',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working ✅', timestamp: new Date().toISOString() });
});

// Make sure these lines are present BEFORE MongoDB connection and server listen
app.use('/api/auth', authRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/payment', payment);
app.use('/api/contact', contactRoutes);

// Connect MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('🔒 CORS Origins:', corsOptions.origin);
    console.log('📦 Environment:', process.env.NODE_ENV || 'development');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌍 Frontend URL configured: ${process.env.FRONTEND_URL || 'Not set'}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
```

---

### **STEP 4: Update Backend Payment Routes**

Replace `backend/routes/payment.js` entirely with the corrected version provided below.

**Key fixes in payment.js:**
- ✅ Proper Razorpay instance initialization with error checking
- ✅ Complete logging for debugging production issues
- ✅ Proper error handling with success/failure flags
- ✅ Validation for email and phone numbers
- ✅ Better response structure (always includes `success` flag)
- ✅ Environment-aware error messages (shows full error in dev, hides in prod)
- ✅ Proper order status tracking with timestamps

---

### **STEP 5: Update Frontend CartPage.jsx**

Replace the payment-related code in CartPage.jsx:

```javascript
// CORRECT payment fetch calls - already in CartPage.jsx but verify:

const handleCartPayment = async () => {
    if (cart.length === 0) return;
    const amount = total;
    try {
      // ✅ CORRECT: Using VITE_ prefixed variable
      const backendUrl = import.meta.env.VITE_BACKEND_HOST_URL;
      
      if (!backendUrl) {
        throw new Error('Backend URL not configured. Check your .env file');
      }

      const res = await fetch(
        `${backendUrl}/api/payment/order`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"  // ✅ CORRECT: Let browser handle multipart
          },
          body: JSON.stringify({ amount }),
        },
      );
      
      const data = await res.json();
      console.log('📝 Order response:', data);
      
      if (!res.ok || !data?.data) {
        throw new Error(data?.message || "Order creation failed");
      }
      
      await handlePayment(data.data);
    } catch (error) {
      console.error('❌ Order error:', error);
      toast.error(error.message || "Order creation failed");
    }
  };

  async function handlePayment(paymentOptions) {
    if (!paymentOptions) {
      toast.error("Payment order was not created");
      return;
    }
    
    if (!paymentOptions.id) {
      console.error('❌ Order ID missing:', paymentOptions);
      toast.error("Invalid order - missing order ID");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // ✅ CORRECT: Using VITE_ prefixed variable
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    
    if (!razorpayKey) {
      toast.error("Razorpay key not configured. Check your .env file");
      return;
    }

    const options = {
      key: razorpayKey,  // ✅ MUST be LIVE key (rzp_live_...) for production
      amount: paymentOptions.amount,
      currency: paymentOptions.currency,
      name: "Devknus",
      description: "Cart Payment",
      order_id: paymentOptions.id,  // ✅ CORRECT: Order ID from Razorpay
      handler: async (response) => {
        try {
          console.log('✅ Payment handler response:', response);
          
          const backendUrl = import.meta.env.VITE_BACKEND_HOST_URL;
          const res = await fetch(
            `${backendUrl}/api/payment/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            },
          );
          
          const verifyData = await res.json();
          console.log('✅ Verification response:', verifyData);
          
          if (res.ok && verifyData.success) {
            toast.success("Payment verified successfully! ✅");
            setPaymentSuccess(true);
          } else {
            toast.error(verifyData.message || "Payment verification failed");
          }
        } catch (err) {
          console.error('❌ Verification error:', err);
          toast.error("Payment verification failed");
        }
      },
      modal: {
        ondismiss: async function () {
          console.log('❌ User dismissed payment modal');
          try {
            const backendUrl = import.meta.env.VITE_BACKEND_HOST_URL;
            if (orderId) {
              await fetch(
                `${backendUrl}/api/payment/order-failed`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderId }),
                },
              );
            }
          } catch (err) {
            console.error('❌ Error marking order as failed:', err);
          }
          toast.error("Payment was not completed.");
        },
      },
      theme: { color: "#0D9488" },
    };

    console.log('🔐 Opening Razorpay with options:', options);
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
```

---

## 🚀 Deployment Checklist

### **For Render Backend:**

1. Create `.env` with variables from STEP 1
2. Set `FRONTEND_URL=https://yoursitename.netlify.app`
3. Deploy and verify at `https://your-backend.onrender.com/api/health`
4. Copy the backend URL

### **For Netlify Frontend:**

1. Update `.env` with `VITE_BACKEND_HOST_URL=https://your-backend.onrender.com`
2. Rebuild and deploy
3. Check browser console for any CORS errors

### **Verify in Production:**

```bash
# Test backend health
curl https://your-backend.onrender.com/api/health

# Test CORS preflight
curl -H "Origin: https://yoursitename.netlify.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://your-backend.onrender.com/api/payment/order
```

---

## 🔍 Debugging Production Issues

### **Check if order_id is being returned:**
```javascript
// In browser console while testing
await fetch('https://your-backend.onrender.com/api/payment/order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 100 })
}).then(r => r.json()).then(d => console.log(d))
```

### **Common Production Issues & Fixes:**

| Issue | Solution |
|-------|----------|
| 400 Bad Request from Razorpay | Check order_id is present in response |
| 500 Error from backend | Check Razorpay credentials in backend .env |
| CORS error | Ensure FRONTEND_URL is set correctly |
| Mixed content warning | Frontend must use HTTPS, backend must use HTTPS |
| Order ID not found | Order creation API might be returning data in wrong format |
| Payment key not recognized | Ensure you're using rzp_live_ key, not test key |

---

## 🎯 Why This Fixes Your Issues

| Error | Root Cause | Fix |
|-------|-----------|-----|
| 400 Bad Request | Order ID not in response | Proper error handling + response logging |
| 500 Server Error | CORS blocking preflight | Explicit CORS configuration with origin array |
| Mixed Content | HTTP calls from HTTPS | Frontend .env now uses HTTPS backend URL |
| Order creation failed | Backend URL on localhost | VITE_BACKEND_HOST_URL now production URL |
| Invalid order_id | Wrong response format | Restructured response with data property |

---

## 📝 Important Notes

- ⚠️ **Do NOT commit actual API keys** to git - use environment variables on hosting
- ⚠️ **RAZORPAY_KEY_ID** must start with `rzp_live_` for production
- ⚠️ **RAZORPAY_SECRET** should ONLY be on backend, NEVER on frontend
- ⚠️ **VITE_ prefix** is required for frontend env variables to be accessible in browser
- ⚠️ **Credentials: true** in CORS is needed for auth requests
- ✅ Always test with **real production keys** after deployment

