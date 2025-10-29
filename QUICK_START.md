# Railway Deployment - Quick Start Guide

Your arbitrage scanner is ready to deploy! Here's exactly what to do.

## What's Been Done ✅

Your project now has:
- ✅ Real API integration (Kalshi + Polymarket)
- ✅ Intelligent fallback to mock data
- ✅ Git repository initialized
- ✅ Production build configuration
- ✅ Procfile for Railway

## What You Need to Do (5 Steps)

### Step 1: Create GitHub Account
- Go to https://github.com/signup
- Sign up with your email
- Verify your email

### Step 2: Create a New Repository
- Go to https://github.com/new
- Name it: `kalshi-poly-scanner`
- Click "Create repository"
- Copy the URL (looks like: `https://github.com/YOUR_USERNAME/kalshi-poly-scanner.git`)

### Step 3: Push Your Code to GitHub

Open Command Prompt/Terminal and run:

```bash
cd C:\Users\wired\Desktop\kalshi-poly-scanner
git remote add origin https://github.com/YOUR_USERNAME/kalshi-poly-scanner.git
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME` with your GitHub username

When prompted for password:
1. Go to https://github.com/settings/tokens/new
2. Click "Generate token"
3. Select "repo" scope
4. Copy the token
5. Paste it when asked for password

### Step 4: Deploy to Railway

1. Go to https://railway.app/
2. Click "Start a New Project"
3. Select "Deploy from GitHub"
4. Select `kalshi-poly-scanner`
5. Click "Deploy Now"

Railway will:
- Install dependencies
- Build your frontend
- Start your backend
- Run your bot 24/7

### Step 5: Configure & Access

1. In Railway dashboard, click "Variables"
2. Add: `USE_REAL_API` = `true`
3. Click "Logs" to see your bot running

**Your bot is now live!** 🚀

---

## What Happens Now

✅ **Your bot runs 24/7** - scanning for arbitrage opportunities
✅ **No more firewall issues** - Railway has full internet access
✅ **Real APIs working** - Kalshi and Polymarket APIs accessible
✅ **Auto-restarts** - if something fails, Railway restarts it

## Accessing Your Bot

Once deployed, Railway gives you a URL like:
```
https://kalshi-poly-scanner-production.up.railway.app
```

Visit that URL in your browser to see your scanner!

## Monitoring Your Bot

In Railway dashboard:
1. Click "Logs" tab
2. Watch real-time scanning:
   ```
   Fetching Kalshi markets...
   Fetching Polymarket markets...
   Arbitrage opportunities found: 4
   ```

## Cost

- **Free tier**: Includes $5/month credit
- **After free tier**: ~$5-10/month to keep running 24/7
- **No usage charges**: You only pay for uptime, not API calls

## Next Steps (Optional)

Once deployed, you can add:
- 📧 Email alerts when opportunities found
- 🔄 Automatic order execution
- 📊 Historical data tracking
- 📱 Mobile app

---

**Questions?** Check `RAILWAY_DEPLOYMENT.md` for detailed instructions.

**Ready?** Start with Step 1 above! 🚀
