# ✅ Production Deployment Checklist - Razorpay Netlify

## 🔧 BACKEND FIXES (Render.com)

### Step 1: Update Backend Files

- [ ] Replace `backend/server.js` with `CORRECTED_server.js`
  ```bash
  cp CORRECTED_server.js backend/server.js
  ```

- [ ] Replace `backend/routes/payment.js` with `CORRECTED_payment.js`
  ```bash
  cp CORRECTED_payment.js backend/routes/payment.js
  ```

### Step 2: Update Backend .env Variables in Render Dashboard

Go to: **Render Dashboard → Your Service → Settings → Environment**

Add/Update:
```
PORT=5000
MONGO_URI=mongodb+srv://mayankcharde2:e-commerce@e-commerce.wxu1xmc.mongodb.net/
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
RAZORPAY_SECRET=Vi85aFH0wz27Q4VU2LoOokcJ
NODE_ENV=production
FRONTEND_URL=https://your-netlify-site.netlify.app
```

⚠️ **Replace `your-netlify-site`** with your actual Netlify domain

### Step 3: Deploy Backend

- [ ] Push changes to GitHub
- [ ] Render auto-deploys
- [ ] Check logs for: `✅ Razorpay initialized with key`

### Step 4: Copy Backend URL

- [ ] Backend URL: `https://your-render-service.onrender.com`
- [ ] Test health endpoint: `https://your-render-service.onrender.com/api/health`

---

## 🌐 FRONTEND FIXES (Netlify)

### Step 1: Create/Update Netlify Configuration

- [ ] Copy `frontend/netlify.toml` provided
- [ ] Update backend URL in `netlify.toml` (if using redirects)

### Step 2: Update Frontend .env

Update `frontend/.env`:
```env
VITE_BACKEND_HOST_URL=https://your-render-service.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
```

### Step 3: Update Netlify Environment Variables

Go to: **Netlify Dashboard → Site Settings → Environment**

Add:
```
VITE_BACKEND_HOST_URL=https://your-render-service.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
```

### Step 4: Deploy Frontend

- [ ] Commit and push to GitHub
- [ ] Netlify auto-deploys
- [ ] Wait for "Publish successful"

---

## 🧪 TESTING CHECKLIST

### Backend Tests

```bash
# Test 1: Backend Health Check
curl https://your-render-service.onrender.com/api/health
# Expected: { status: 'ok', ... }

# Test 2: CORS Preflight
curl -X OPTIONS https://your-render-service.onrender.com/api/payment/order \
  -H "Origin: https://your-netlify-site.netlify.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"
# Expected: 200 OK

# Test 3: Order Creation
curl -X POST https://your-render-service.onrender.com/api/payment/order \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-netlify-site.netlify.app" \
  -d '{"amount": 100}'
# Expected: { data: { id: "order_...", amount: 10000, ... }, success: true }
```

### Frontend Tests

1. [ ] Open your Netlify site in browser
2. [ ] Open DevTools → Console
3. [ ] Add items to cart
4. [ ] Click "Buy Now Products"
5. [ ] Fill user info
6. [ ] Click "Proceed to Payment"
7. [ ] Razorpay checkout should open (no CORS errors)
8. [ ] Enter test card: `4111 1111 1111 1111`
9. [ ] Payment should complete without errors

### Console Checks

In browser DevTools Console, you should NOT see:

```
❌ CORS error
❌ Mixed content warning
❌ 400 Bad Request from Razorpay
❌ 500 Internal Server Error
❌ "Cannot find module"
```

You SHOULD see:

```
✅ Order response: { data: { id: "order_...", ... }, success: true }
✅ Payment handler response: { razorpay_order_id: "order_...", ... }
✅ Verification response: { success: true, ... }
```

---

## 🚨 COMMON MISTAKES TO AVOID

### ❌ Mistake 1: Forgetting to Update FRONTEND_URL

- [ ] Backend .env has `FRONTEND_URL=https://your-netlify-site.netlify.app` (with HTTPS)
- [ ] No trailing slash: `https://your-netlify-site.netlify.app` NOT `https://your-netlify-site.netlify.app/`

### ❌ Mistake 2: Using Test Key Instead of Live Key

- [ ] Check key starts with `rzp_live_` NOT `rzp_test_`
- [ ] Update in both:
  - Backend .env: `RAZORPAY_KEY_ID=rzp_live_...`
  - Frontend .env: `VITE_RAZORPAY_KEY_ID=rzp_live_...`
  - Render env vars

### ❌ Mistake 3: Using HTTP for Backend URL

- [ ] Frontend .env: `VITE_BACKEND_HOST_URL=https://...` (HTTPS)
- [ ] NOT `http://...` (HTTP)
- [ ] NOT `http://localhost:5000` (only for local dev)

### ❌ Mistake 4: Missing VITE_ Prefix

- [ ] Variables must start with `VITE_` to be accessible in browser
- [ ] `VITE_RAZORPAY_KEY_ID` ✅
- [ ] `RAZORPAY_KEY_ID` ❌ (won't work in frontend)

### ❌ Mistake 5: Not Redeploying After Env Changes

- [ ] After updating env vars, redeploy:
  - **Render**: Go to Service → Manual Deploy
  - **Netlify**: Go to Deploys → Trigger Deploy

---

## 🔍 DEBUGGING STEPS

If payment still fails:

### 1. Check Backend Logs
```
Render Dashboard → Your Service → Logs

Look for:
✅ "Connected to MongoDB"
✅ "Razorpay initialized with key"
✅ Order creation request log
❌ Any error messages
```

### 2. Check Frontend Logs
```
Browser DevTools → Console

Look for:
✅ Backend URL printed correctly
✅ Razorpay key printed correctly
❌ CORS errors
❌ Network 404/500 errors
```

### 3. Check Network Requests
```
Browser DevTools → Network tab

1. Look for /api/payment/order request
   - Status should be 200
   - Response should have "data" with "id" field

2. Look for /api/payment/verify request
   - Status should be 200
   - Response should have "success: true"
```

### 4. Test with Curl
```bash
# If order creation fails, test directly:
curl -X POST https://your-render-backend.onrender.com/api/payment/order \
  -H "Content-Type: application/json" \
  -d '{"amount": 100}' \
  -v

# Check:
# - Response status (should be 200, not 500)
# - Response body (should have "data" with "id")
# - CORS headers (should have Access-Control-Allow-Origin)
```

---

## 📋 FINAL VERIFICATION

- [ ] Backend health: `https://your-render-service.onrender.com/api/health` → 200 OK
- [ ] Frontend loads: `https://your-netlify-site.netlify.app` → No errors
- [ ] CORS works: Preflight request returns 200 OK
- [ ] Order creation: Returns proper order object with "id" field
- [ ] Payment window: Opens without CORS errors
- [ ] Payment verification: Completes successfully
- [ ] Order saved: Appears in MongoDB

---

## 🎯 If Everything Works

Congratulations! Your Razorpay payment integration is now production-ready:

1. ✅ CORS properly configured for Netlify domain
2. ✅ HTTPS enforced throughout (no mixed content)
3. ✅ Environment variables correctly set on both frontend and backend
4. ✅ Order creation returns proper structure
5. ✅ Payment verification working
6. ✅ Data saved to MongoDB
7. ✅ Proper error handling and logging

---

## 📞 Need Help?

See the detailed troubleshooting guide: `RAZORPAY_TROUBLESHOOTING.md`

Key sections:
- 400 Bad Request from Razorpay
- 500 Internal Server Error
- Mixed Content: HTTPS page loaded HTTP
- CORS errors
- Payment verification failed

