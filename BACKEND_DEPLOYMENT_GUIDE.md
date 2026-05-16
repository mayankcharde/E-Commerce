# Backend Deployment Guide - Render.com

## Step 1: Create Render Account & Service

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (or use "Public Git repository")
4. Fill in:
   - **Name**: `e-commerce-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Region**: Choose closest to your users

## Step 2: Configure Environment Variables

In Render dashboard, go to **Service → Environment**

Add these variables:

```
PORT=5000
MONGO_URI=mongodb+srv://mayankcharde2:e-commerce@e-commerce.wxu1xmc.mongodb.net/
JWT_SECRET=your_jwt_secret_key_here
RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
RAZORPAY_SECRET=Vi85aFH0wz27Q4VU2LoOokcJ
NODE_ENV=production
FRONTEND_URL=https://yoursitename.netlify.app
```

⚠️ **CRITICAL**: Replace `yoursitename` with your actual Netlify URL

## Step 3: Deploy & Verify

1. Render auto-deploys from git push
2. Check logs in Render dashboard
3. Verify backend is running: 
   ```
   https://e-commerce-backend.onrender.com/api/health
   ```
4. Copy this URL for Netlify configuration

## Step 4: Update Netlify Environment Variables

In Netlify UI → Site settings → Environment:

```
VITE_BACKEND_HOST_URL=https://e-commerce-backend.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_live_SjYgq5Oqk9VOj6
```

## Step 5: Redeploy Frontend

Trigger a rebuild in Netlify to pick up new environment variables:
1. Netlify dashboard → Deploys → Trigger deploy

## Expected Logs After Deployment

You should see in Render logs:
```
✅ Connected to MongoDB
🔒 CORS Origins: [
  'http://localhost:3000',
  'http://localhost:5173', 
  'https://yoursitename.netlify.app'
]
📦 Environment: production
🚀 Server running on http://localhost:5000
🌍 Frontend URL configured: https://yoursitename.netlify.app
```

## Common Deployment Issues

### Issue: "Cannot find module"
**Solution**: 
```bash
# Run locally first
npm install
node server.js

# Then push to git
git add .
git commit -m "Fix deployment"
git push
```

### Issue: MongoDB connection fails
**Solution**: 
- Check MONGO_URI is correct
- Verify IP address is whitelisted in MongoDB Atlas
- Go to MongoDB Atlas → Network Access → Add IP Address
- Add `0.0.0.0` for Render access

### Issue: Razorpay key errors
**Solution**:
- Verify RAZORPAY_KEY_ID starts with `rzp_live_`
- Check RAZORPAY_SECRET is correct (copy from Razorpay dashboard again)
- Ensure these are in Render environment variables

### Issue: CORS errors in browser
**Solution**:
- Check FRONTEND_URL matches your Netlify URL exactly
- Verify no trailing slashes in FRONTEND_URL
- Redeploy backend after updating FRONTEND_URL

## Testing Production Payment Flow

1. Open your Netlify site
2. Add items to cart
3. Click "Buy Now"
4. Fill user info and click "Proceed to Payment"
5. Razorpay checkout should open
6. Use test card: 4111 1111 1111 1111 (any future expiry, any CVV)
7. Payment should complete successfully
