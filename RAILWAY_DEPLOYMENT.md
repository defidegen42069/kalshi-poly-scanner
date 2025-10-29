# Railway Deployment Guide

Your project is ready for deployment! Follow these steps to deploy to Railway.

## Step 1: Create a GitHub Account & Repository

1. Go to https://github.com/signup and create a free account (if you don't have one)
2. Confirm your email address
3. Go to https://github.com/new to create a new repository
4. Name it: `kalshi-poly-scanner`
5. Description: "Arbitrage scanner for Kalshi and Polymarket"
6. Click "Create repository"

## Step 2: Push Your Code to GitHub

In your terminal, run these commands:

```bash
cd C:\Users\wired\Desktop\kalshi-poly-scanner

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/kalshi-poly-scanner.git

# Rename branch to main (Railway expects this)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

You'll be prompted for a password. Use a Personal Access Token (not your password):
- Go to https://github.com/settings/tokens/new
- Select scopes: `repo` (full control of private repositories)
- Click "Generate token"
- Copy the token
- Paste it when prompted for password

## Step 3: Deploy to Railway

1. Go to https://railway.app/
2. Click "Start a New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select `kalshi-poly-scanner` repository
6. Click "Deploy Now"

Railway will automatically:
- Install dependencies
- Build the frontend
- Start the backend
- Run your bot 24/7

## Step 4: Configure Environment Variables

1. In Railway dashboard, go to your project
2. Click "Variables" tab
3. Add this variable:
   - Key: `USE_REAL_API`
   - Value: `true`
4. Click "Save"

## Step 5: Get Your URL

1. Go back to "Settings" or "Deployments"
2. Look for "Domain" - this is your public URL
3. It will look like: `https://kalshi-poly-scanner-production.up.railway.app`

## Step 6: Access Your Bot

Open your bot URL in browser:
```
https://your-railway-url:8000
```

Or if the URL auto-redirects, just use the domain.

## Step 7: Monitor Logs

In Railway dashboard:
1. Click "Logs" tab
2. You'll see real-time logs of your bot scanning for arbitrage opportunities

## Troubleshooting

### Bot not starting?
- Check "Logs" tab for error messages
- Make sure environment variable `USE_REAL_API=true` is set

### Port issues?
- Railway automatically assigns a PORT
- Our code uses `process.env.PORT` so it should work

### Frontend not loading?
- Make sure build succeeded in logs
- Check browser console for errors (F12)

## Next Steps

Your bot is now running 24/7 on Railway!

- Monitor the logs to see arbitrage opportunities
- Add notifications when opportunities are found
- Add order execution to automatically trade
- Scale up if needed

Enjoy your arbitrage scanner! 🚀
