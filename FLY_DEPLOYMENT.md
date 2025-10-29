# Fly.io Deployment Guide - NO CREDIT CARD NEEDED

Fly.io is completely free with no credit card required. Perfect for your arbitrage bot!

## Why Fly.io?
✅ Free tier (truly free, no card required)
✅ Runs 24/7 continuously
✅ Full Node.js support
✅ Easy deployment with CLI
✅ Real APIs will work

---

## **Quick Deployment (10 minutes)**

### Step 1: Install Fly CLI
Download and install from: https://fly.io/docs/hands-on/install-flyctl/

**For Windows:**
- Download installer from https://github.com/superfly/flyctl/releases
- Or use: `choco install flyctl` (if you have Chocolatey)

### Step 2: Sign Up (No Card)
```bash
flyctl auth signup
```
- Email: your email
- Password: create one
- **Don't add credit card** - skip that step

### Step 3: Login
```bash
flyctl auth login
```

### Step 4: Deploy Your App
```bash
cd C:\Users\wired\Desktop\kalshi-poly-scanner
flyctl launch
```

When prompted:
- App name: `kalshi-poly-scanner`
- Region: `sjc` (San Jose) - or choose nearest
- Postgres database: `N` (no, we don't need it)
- Deploy now: `Y` (yes)

### Step 5: Set Environment Variable
```bash
flyctl secrets set USE_REAL_API=true
```

### Step 6: Monitor Deployment
```bash
flyctl logs
```

You'll see your bot running:
```
Fetching Kalshi markets...
Fetching Polymarket markets...
```

---

## Your App is Live!

Get your URL:
```bash
flyctl info
```

Look for "Hostname:" - that's your public URL!

Example: `https://kalshi-poly-scanner.fly.dev`

---

## After Deployment

✅ Visit your URL in browser
✅ Watch logs: `flyctl logs`
✅ Bot runs 24/7 automatically
✅ Real APIs working!

---

## Commands You'll Use

```bash
# View logs in real-time
flyctl logs

# Check app status
flyctl status

# View deployment history
flyctl history

# Redeploy after code changes
flyctl deploy

# Stop the app (if needed)
flyctl scale count 0

# Start the app again
flyctl scale count 1
```

---

## Troubleshooting

### App won't start?
```bash
flyctl logs
```
Check logs for errors

### Need to update code?
```bash
git push
flyctl deploy
```

### Want to check if APIs are working?
```bash
flyctl logs
```
Look for "Fetching Kalshi markets..." messages

---

## Free Tier Details

Fly.io free tier includes:
- ✅ 3 shared-cpu-1x 256MB VMs
- ✅ 160 GB egress (plenty!)
- ✅ 750 hours per month (covers 24/7)
- ✅ Perfect for your bot

---

**Ready? Install Fly CLI and start Step 1!** 🚀

Let me know when you've deployed!
