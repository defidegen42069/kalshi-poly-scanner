# Render Deployment Guide - Quick Start

Your code is already on GitHub! Now deploy to Render (free tier works perfectly).

## Step-by-Step Deployment (5 minutes)

### Step 1: Go to Render
- Open https://render.com
- Click "Sign up"
- Use your GitHub account (defidegen42069)
- Click "Continue with GitHub"

### Step 2: Connect Your Repository
- Click "New +"
- Select "Web Service"
- Click "Connect a repository"
- Find and select `kalshi-poly-scanner`
- Click "Connect"

### Step 3: Configure the Service
Fill in these fields:

| Field | Value |
|-------|-------|
| Name | `kalshi-poly-scanner` |
| Environment | `Node` |
| Region | `Oregon` (or closest to you) |
| Branch | `main` |
| Build Command | `npm install && npm run build` |
| Start Command | `node backend-js/index.js` |

### Step 4: Add Environment Variables
1. Scroll down to "Environment"
2. Click "Add Environment Variable"
3. Add:
   - **Key**: `USE_REAL_API`
   - **Value**: `true`
4. Click "Add"

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for build to complete (2-3 minutes)
3. You'll see a URL like: `https://kalshi-poly-scanner.onrender.com`

## Success!

Once deployed, you'll see:
- ✅ Green checkmark (service running)
- ✅ Your bot URL
- ✅ Live logs showing arbitrage scanning

## Monitor Your Bot

1. Click "Logs" tab to see real-time output
2. Look for messages like:
   ```
   Fetching Kalshi markets...
   Fetching Polymarket markets...
   ```

## Free Tier Details

- ✅ Always running (no cold starts)
- ✅ 750 hours per month (covers 24/7)
- ✅ Full Node.js support
- ✅ No credit card needed
- Free until you need scaling

## Next Steps

Once deployed:
- Visit your bot URL in browser
- Watch the logs for arbitrage opportunities
- Add email alerts (optional)
- Add trade execution (optional)

## Troubleshooting

### Build fails?
- Check "Logs" tab
- Make sure `npm start` works locally

### Environment variable not working?
- Go to Settings → Environment
- Make sure `USE_REAL_API=true` is set
- Redeploy

### Logs show errors?
- Check if it's a network issue (firewall solved!)
- Check if API format changed
- Fallback to mock data works

---

**Ready? Start with Step 1!** 🚀
