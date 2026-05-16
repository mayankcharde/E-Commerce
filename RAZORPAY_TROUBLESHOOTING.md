# 🔴 Razorpay Production Error Troubleshooting

## Common Error Messages & Fixes

### ❌ Error: "400 Bad Request from Razorpay"

**What it means**: Razorpay rejected your order creation request

**Causes & Fixes**:

1. **Invalid Amount Format**
   ```javascript
   // ❌ WRONG - sending as string
   { amount: "100" }
   
   // ✅ CORRECT - convert to number, then multiply by 100 for paise
   const amountInRupees = Number(amount);
   const amountInPaise = Math.round(amountInRupees * 100);
   { amount: amountInPaise }
   ```

2. **Missing RAZORPAY_KEY_ID**
   ```bash
   # Check backend logs
   curl https://your-backend.onrender.com/api/health
   
   # You should see:
   # ✅ Razorpay initialized with key: rzp_live_...
   ```

3. **Order ID not in response**
   ```javascript
   // ❌ WRONG - order doesn't have 'id' field
   const rzpOrder = { order_id: "123", ... }
   
   // ✅ CORRECT - Razorpay returns 'id' field
   const rzpOrder = { id: "order_ABC123", ... }
   
   // Use it as:
   order_id: paymentOptions.id  // NOT paymentOptions.order_id
   ```

### ❌ Error: "500 Internal Server Error"

**What it means**: Backend crashed or Razorpay credentials are invalid

**Fixes**:

1. **Invalid Razorpay credentials**
   ```bash
   # In Render environment variables, verify:
   RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6     # ✅ Starts with rzp_live_
   RAZORPAY_SECRET=Vi85aFH0wz27Q4VU2LoOokcJ    # ✅ No spaces, correct value
   
   # Copy fresh from Razorpay dashboard:
   # Dashboard → Settings → API Keys
   ```

2. **Backend not receiving requests**
   ```bash
   # Test backend is accessible:
   curl https://your-backend.onrender.com/api/health
   
   # Should return: { status: "ok", ... }
   ```

3. **CORS preventing the request**
   ```bash
   # Test CORS preflight:
   curl -X OPTIONS https://your-backend.onrender.com/api/payment/order \
     -H "Origin: https://yoursitename.netlify.app" \
     -H "Access-Control-Request-Method: POST"
   
   # Should return 200, NOT 403
   ```

### ❌ Error: "Mixed Content: HTTPS page loaded HTTP resource"

**What it means**: Netlify (HTTPS) trying to call HTTP backend

**Fix**:
```javascript
// ❌ WRONG - using HTTP
VITE_BACKEND_HOST_URL=http://your-backend.onrender.com

// ✅ CORRECT - using HTTPS
VITE_BACKEND_HOST_URL=https://your-backend.onrender.com
```

Update in **Netlify → Site settings → Environment variables**

### ❌ Error: "RAZORPAY_KEY_ID not configured"

**What it means**: Backend can't find Razorpay credentials

**Fixes**:

1. **Check Render environment variables**
   ```bash
   # Render dashboard → Service → Environment
   # Verify these are set:
   RAZORPAY_KEY_ID=rzp_live_...
   RAZORPAY_SECRET=Vi85aFH...
   ```

2. **Check .env file exists and has correct values**
   ```bash
   # In your backend root folder
   cat .env
   
   # Should show:
   RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
   RAZORPAY_SECRET=Vi85aFH0wz27Q4VU2LoOokcJ
   ```

3. **Restart Render service after adding env vars**
   - Go to Render dashboard
   - Find your service
   - Click "Manual Deploy"

### ❌ Error: "Payment verification failed - invalid signature"

**What it means**: Razorpay signature verification failed (security issue)

**Causes & Fixes**:

1. **Using wrong RAZORPAY_SECRET for verification**
   ```javascript
   // ❌ WRONG - secret changed
   const expectedSign = crypto
     .createHmac("sha256", process.env.RAZORPAY_SECRET)  // Make sure this matches
   
   // ✅ Copy fresh from Razorpay dashboard
   // Dashboard → Settings → API Keys → Secret Key
   ```

2. **Frontend sending wrong order/payment IDs**
   ```javascript
   // ✅ CORRECT - these come from Razorpay response
   {
     razorpay_order_id: response.razorpay_order_id,     // From Razorpay
     razorpay_payment_id: response.razorpay_payment_id, // From Razorpay
     razorpay_signature: response.razorpay_signature    // From Razorpay
   }
   ```

### ❌ Error: "Cannot read property 'id' of undefined"

**What it means**: Order response doesn't have 'id' field

**Fixes**:

1. **Check backend is returning proper order object**
   ```javascript
   // In browser console:
   const res = await fetch('https://your-backend.onrender.com/api/payment/order', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ amount: 100 })
   });
   const data = await res.json();
   console.log(data);
   
   // Should see:
   // {
   //   data: {
   //     id: "order_ABC123xyz",
   //     amount: 10000,
   //     currency: "INR",
   //     ...
   //   }
   // }
   ```

2. **Check Razorpay order creation is working**
   ```bash
   # Test Razorpay credentials directly
   curl -X POST https://api.razorpay.com/v1/orders \
     -H "Authorization: Basic $(echo -n 'rzp_live_:secret' | base64)" \
     -H "Content-Type: application/json" \
     -d '{"amount": 10000, "currency": "INR"}'
   ```

---

## 🔧 Debug Checklist

When payment fails, check in this order:

### 1. Backend Configuration
```bash
# ✅ Is backend running?
curl https://your-backend.onrender.com/api/health

# ✅ Are credentials set?
# Check Render → Service → Environment variables

# ✅ Can it create orders?
curl -X POST https://your-backend.onrender.com/api/payment/order \
  -H "Content-Type: application/json" \
  -d '{"amount": 100}'
```

### 2. Frontend Configuration
```javascript
// ✅ Check in browser console:
console.log(import.meta.env.VITE_BACKEND_HOST_URL);
console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);

// Should print:
// https://your-backend.onrender.com
// rzp_live_SjYgq5Oqk9VOj6
```

### 3. Network Requests
```javascript
// ✅ Check order creation request in Network tab:
// POST https://your-backend.onrender.com/api/payment/order
// Response should include "data" with "id" field

// ✅ Check verification request:
// POST https://your-backend.onrender.com/api/payment/verify
// Response should have "success: true"
```

### 4. Browser Console
```javascript
// ✅ Look for errors:
// 1. CORS errors → Check FRONTEND_URL in backend
// 2. 404 errors → Check backend URL in frontend .env
// 3. 500 errors → Check Razorpay credentials in backend
// 4. TypeError → Check response structure in backend
```

---

## 🚨 Production Checklist Before Going Live

- [ ] Backend deployed on Render with all env vars set
- [ ] Frontend deployed on Netlify with all env vars set
- [ ] RAZORPAY_KEY_ID starts with `rzp_live_` (not `rzp_test_`)
- [ ] RAZORPAY_SECRET matches Razorpay dashboard
- [ ] FRONTEND_URL in backend matches Netlify domain exactly
- [ ] VITE_BACKEND_HOST_URL uses HTTPS
- [ ] MongoDB Atlas firewall allows Render IP (0.0.0.0 for development)
- [ ] Test payment flow end-to-end on production
- [ ] Check browser Network tab for failed requests
- [ ] Check Render logs for errors
- [ ] Verify order is saved in MongoDB after payment

---

## 📞 If Still Not Working

1. **Check Render logs**:
   ```
   Render dashboard → Service → Logs
   Look for: ✅ Connected to MongoDB, Razorpay initialized
   ```

2. **Check Netlify build logs**:
   ```
   Netlify dashboard → Deploys → Latest deploy
   Look for build errors
   ```

3. **Check MongoDB connection**:
   ```
   MongoDB Atlas → Network Access
   Make sure 0.0.0.0 is whitelisted for Render
   ```

4. **Test with curl**:
   ```bash
   # Order creation
   curl -X POST https://your-backend.onrender.com/api/payment/order \
     -H "Content-Type: application/json" \
     -H "Origin: https://yoursitename.netlify.app" \
     -d '{"amount": 100}'
   ```

