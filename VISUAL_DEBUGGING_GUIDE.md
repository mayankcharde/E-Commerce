# 🔄 Razorpay Payment Flow Diagram & Troubleshooting

## 🎯 Complete Payment Flow (What Should Happen)

```
┌─────────────────────────────────────────────────────────────────┐
│                     LOCAL DEVELOPMENT FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Frontend (http://localhost:5173)                                │
│  ├─ Add to Cart                                                  │
│  ├─ Buy Now → Shows Form                                         │
│  ├─ Submit User Info → POST /api/payment/userinfo               │
│  │   └─ Response: { orderId, success: true }                     │
│  ├─ Payment Button → POST /api/payment/order                    │
│  │   └─ Response: { data: { id: "order_...", ... } }            │
│  ├─ Load Razorpay Script                                         │
│  ├─ Open Razorpay Checkout with order_id                        │
│  │   └─ Razorpay API call (order_id must be valid)              │
│  └─ Payment Success → POST /api/payment/verify                  │
│      └─ Verification + Save Payment                              │
│          └─ MongoDB saved order with status: "placed"            │
│                                                                   │
│  Backend (http://localhost:5000)                                 │
│  └─ All endpoints accessible without CORS issues                 │
│     (Same machine, no cross-origin)                              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│               PRODUCTION DEPLOYMENT FLOW (FIXED)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Frontend                                                         │
│  https://your-netlify-site.netlify.app                           │
│  ├─ .env has VITE_BACKEND_HOST_URL=https://render-url...        │
│  ├─ .env has VITE_RAZORPAY_KEY_ID=rzp_live_...                  │
│  ├─ Add to Cart                                                  │
│  ├─ Buy Now → Shows Form                                         │
│  ├─ Submit User Info                                             │
│  │   └─ Preflight OPTIONS request (CORS check)                   │
│  │   └─ POST https://render-url/api/payment/userinfo             │
│  │       └─ Backend CORS allows this origin ✅                   │
│  │       └─ Response: { orderId, success: true }                 │
│  │                                                                │
│  ├─ Payment Button                                               │
│  │   └─ Preflight OPTIONS request (CORS check)                   │
│  │   └─ POST https://render-url/api/payment/order                │
│  │       └─ Backend CORS allows this origin ✅                   │
│  │       └─ Response: { data: { id: "order_...", ... } }        │
│  │                                                                │
│  ├─ Load Razorpay Script from https://checkout.razorpay.com     │
│  ├─ Open Razorpay Checkout with:                                 │
│  │   ├─ key: rzp_live_... (from .env)                            │
│  │   ├─ order_id: order_... (from backend)                       │
│  │   └─ Opens in popup                                            │
│  │                                                                │
│  └─ Payment Success                                              │
│      └─ Preflight OPTIONS request (CORS check)                   │
│      └─ POST https://render-url/api/payment/verify               │
│          └─ Backend CORS allows this origin ✅                   │
│          └─ Verify signature                                      │
│          └─ Save to MongoDB                                       │
│          └─ Response: { success: true }                          │
│                                                                   │
│  Backend                                                          │
│  https://your-render-backend.onrender.com                        │
│  ├─ Environment: .env or Render dashboard                        │
│  ├─ CORS configured: origin includes Netlify domain              │
│  ├─ POST /api/payment/userinfo                                   │
│  │   └─ Validate data                                             │
│  │   └─ Save to MongoDB                                           │
│  │   └─ Return orderId                                            │
│  ├─ POST /api/payment/order                                      │
│  │   └─ Initialize Razorpay with credentials                     │
│  │   └─ Call razorpayInstance.orders.create()                    │
│  │   └─ Return order with proper 'id' field                      │
│  └─ POST /api/payment/verify                                     │
│      └─ Verify signature with RAZORPAY_SECRET                    │
│      └─ Save payment to MongoDB                                   │
│      └─ Update order status                                       │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## ❌ What Happens When CORS is Wrong

```
Frontend Request:
POST https://render-backend.com/api/payment/order
From: https://netlify-site.netlify.app
Headers: Content-Type: application/json

Browser Preflight (OPTIONS request):
OPTIONS https://render-backend.com/api/payment/order
From: https://netlify-site.netlify.app
Headers: 
  - Origin: https://netlify-site.netlify.app
  - Access-Control-Request-Method: POST
  - Access-Control-Request-Headers: Content-Type

❌ Backend Response (WITH cors()):
Access-Control-Allow-Origin: *
(Wildcard doesn't work for credentials requests!)

❌ Browser Error:
"Access to XMLHttpRequest at 'https://render-backend.com/api/payment/order' 
from origin 'https://netlify-site.netlify.app' has been blocked by CORS policy"

Status: 403 Forbidden


✅ Backend Response (WITH corsOptions):
Access-Control-Allow-Origin: https://netlify-site.netlify.app
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type

✅ Browser: Allows request to proceed
✅ Actual POST request is sent
✅ Payment can proceed
```

---

## 📊 How to Read Network Requests

### Successful Request (Production)

```
Request:
POST /api/payment/order HTTP/2
Host: your-render-backend.onrender.com
Origin: https://your-netlify-site.netlify.app
Content-Type: application/json

{"amount": 100}

Response Status: 200 OK

Response Headers:
Access-Control-Allow-Origin: https://your-netlify-site.netlify.app
Access-Control-Allow-Credentials: true
Content-Type: application/json

Response Body:
{
  "data": {
    "id": "order_ABC123XYZ789",
    "amount": 10000,
    "currency": "INR",
    "receipt": "receipt_abc123",
    "status": "created"
  },
  "success": true,
  "message": "Order created successfully"
}
```

### Failed Request (Old Code)

```
Request:
POST /api/payment/order HTTP/2
Host: your-render-backend.onrender.com
Origin: https://your-netlify-site.netlify.app

Response Status: 500 Internal Server Error

Response Body:
{
  "message": "Internal Server Error"
}

Browser Console Error:
Access to XMLHttpRequest blocked by CORS policy
```

---

## 🔍 Step-by-Step Debugging

### Step 1: Check Environment Variables

**Frontend**
```javascript
// In browser console:
console.log('Backend URL:', import.meta.env.VITE_BACKEND_HOST_URL);
console.log('Razorpay Key:', import.meta.env.VITE_RAZORPAY_KEY_ID);

// Should see:
// Backend URL: https://your-render-backend.onrender.com
// Razorpay Key: rzp_live_SjYgq5Oqk9VOj6
```

**Backend**
```bash
# In Render logs or server output:
# Should see:
✅ Razorpay initialized with key: rzp_live_SjYgq5Oqk9VOj6...
🔒 CORS Origins: [
  'http://localhost:5173',
  'https://your-netlify-site.netlify.app'
]
```

### Step 2: Check Preflight Request

```bash
# In Network tab, look for OPTIONS request
OPTIONS /api/payment/order

Request Headers:
- Origin: https://your-netlify-site.netlify.app
- Access-Control-Request-Method: POST

Response Headers:
✅ Access-Control-Allow-Origin: https://your-netlify-site.netlify.app
✅ Access-Control-Allow-Methods: POST
✅ Status: 200 OK
```

### Step 3: Check Actual POST Request

```bash
# In Network tab, look for POST request
POST /api/payment/order

Request:
{
  "amount": 100
}

Response:
✅ Status: 200 OK
✅ Body:
{
  "data": {
    "id": "order_...",
    ...
  },
  "success": true
}
```

### Step 4: Check Razorpay Response

```javascript
// In browser console during payment:
console.log('Razorpay response:', response);

// Should see:
{
  razorpay_order_id: "order_ABC123",
  razorpay_payment_id: "pay_ABC123",
  razorpay_signature: "abc123def456"
}
```

### Step 5: Check Verification Request

```bash
# In Network tab, look for verify POST
POST /api/payment/verify

Request:
{
  "razorpay_order_id": "order_ABC123",
  "razorpay_payment_id": "pay_ABC123",
  "razorpay_signature": "abc123def456"
}

Response:
✅ Status: 200 OK
✅ Body:
{
  "message": "Payment verified successfully",
  "success": true
}
```

---

## 🚨 Common Error Patterns

### Pattern 1: CORS Blocked (Old Code)

```
Browser Console:
❌ Access to XMLHttpRequest blocked by CORS policy

Network Tab:
Status: (blocked) - not even sent to server

Solution:
✅ Update CORS configuration with origin array
✅ Add process.env.FRONTEND_URL to origins
```

### Pattern 2: 400 Bad Request

```
Network Tab:
POST /api/payment/order
Status: 400 Bad Request

Response Body:
{ "message": "Invalid amount" }

Check:
❌ Is amount being sent as string or number?
❌ Is amount positive?
❌ Is body being parsed correctly?

Solution:
✅ Backend validates and logs amount
✅ Frontend sends as Number type
✅ Response includes detailed error message
```

### Pattern 3: 500 Internal Server Error

```
Network Tab:
POST /api/payment/order
Status: 500 Internal Server Error

Backend Logs:
❌ Error: Cannot read property 'create' of undefined

Cause:
❌ Razorpay not initialized (missing credentials)

Solution:
✅ Check RAZORPAY_KEY_ID in backend .env
✅ Check RAZORPAY_SECRET in backend .env
✅ Redeploy backend after updating credentials
```

### Pattern 4: Mixed Content Warning

```
Browser Console:
⚠️ Mixed Content: The page was loaded over HTTPS, 
  but requested an insecure element...

Source:
Frontend on https://netlify.app
Backend on http://render.com (HTTP!)

Solution:
✅ Update VITE_BACKEND_HOST_URL to https://
✅ Render provides HTTPS by default
✅ Redeploy frontend
```

---

## ✅ Verification Checklist

Use this to verify each component is working:

```javascript
// Copy-paste in browser console

// 1. Frontend Environment
console.log('✓ Backend URL:', import.meta.env.VITE_BACKEND_HOST_URL);
console.log('✓ Razorpay Key:', import.meta.env.VITE_RAZORPAY_KEY_ID);

// 2. Backend Health
fetch(import.meta.env.VITE_BACKEND_HOST_URL + '/api/health')
  .then(r => r.json())
  .then(d => console.log('✓ Backend Health:', d));

// 3. Order Creation
fetch(import.meta.env.VITE_BACKEND_HOST_URL + '/api/payment/order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 100 })
})
  .then(r => r.json())
  .then(d => {
    if (d.data?.id) {
      console.log('✓ Order Created:', d.data.id);
    } else {
      console.log('✗ Order Failed:', d);
    }
  });

// 4. Razorpay Script
console.log('✓ Razorpay Available:', !!window.Razorpay);
```

---

## 🎯 Production Readiness

Before going live, verify all are ✅:

```
Backend (Render):
✅ Health endpoint returns 200
✅ CORS headers present
✅ RAZORPAY_KEY_ID starts with rzp_live_
✅ RAZORPAY_SECRET matches dashboard
✅ FRONTEND_URL set correctly
✅ MongoDB connection works

Frontend (Netlify):
✅ Loads without errors
✅ Environment variables are set
✅ HTTPS only (no mixed content warnings)
✅ All API calls go to HTTPS backend
✅ Razorpay SDK loads

Integration:
✅ Cart functionality works
✅ User form submits
✅ Order creation API succeeds
✅ Razorpay checkout opens
✅ Payment completes
✅ Verification successful
✅ Order saved to MongoDB
```

