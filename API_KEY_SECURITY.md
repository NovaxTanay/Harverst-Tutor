# 🔐 API Key Security Guide

## ⚠️ CRITICAL: Your API Key Has Been Configured

Your Google Gemini API key has been securely stored in the `.env` file.

**API Key:** `AIzaSyCOAy5xqbSX6IWNX7pYbcNB4VtX18FGBl8`

---

## ✅ Security Measures Applied

### 1. Local Development (Secured)
- ✅ API key stored in `.env` file (root directory)
- ✅ `.env` added to `.gitignore` 
- ✅ Never committed to Git
- ✅ Not visible in your code

### 2. Git Protection
Updated `.gitignore` to exclude:
- ✅ `.env` (backend API key)
- ✅ `.env.local` (frontend config)
- ✅ `*.env` (all environment files)
- ✅ Virtual environments
- ✅ Temporary files

### 3. Vercel Deployment (Instructions Below)
You'll add the API key through Vercel's dashboard - never in code!

---

## 🚨 NEVER Do These Things

### ❌ DON'T Commit .env to Git
```bash
# BAD - Don't do this!
git add .env
git commit -m "added config"
```

### ❌ DON'T Hardcode API Keys in Code
```python
# BAD - Never do this!
API_KEY = "AIzaSyCOAy5xqbSX6IWNX7pYbcNB4VtX18FGBl8"
```

### ❌ DON'T Share .env File
- Don't email it
- Don't upload to file sharing services
- Don't paste in chat/Slack (except to me, your AI assistant)

### ❌ DON'T Push to Public GitHub Without Protection
If you accidentally commit your API key:
1. Immediately revoke it at https://makersuite.google.com/app/apikey
2. Generate a new key
3. Update `.env` with new key

---

## ✅ Safe Practices

### DO Use Environment Variables
```python
# GOOD - Use environment variables
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('API_KEY')
```

### DO Keep .gitignore Updated
Always ensure `.env` is in `.gitignore` before first commit.

### DO Use Vercel Environment Variables
For production, add secrets in Vercel dashboard (never in code).

---

## 🔒 Vercel Deployment - Secure API Key Setup

### Step 1: Deploy to Vercel (Without Secrets)

```bash
# From project root
vercel --prod
```

Follow the prompts to create your project.

### Step 2: Add Environment Variables in Vercel Dashboard

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Select your project

2. **Navigate to Settings**
   - Click "Settings" tab
   - Click "Environment Variables"

3. **Add Backend API Key**
   - **Key:** `API_KEY`
   - **Value:** `AIzaSyCOAy5xqbSX6IWNX7pYbcNB4VtX18FGBl8`
   - **Environments:** Production, Preview, Development
   - Click "Save"

4. **Add GEMINI_API_KEY (Same Value)**
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyCOAy5xqbSX6IWNX7pYbcNB4VtX18FGBl8`
   - **Environments:** Production, Preview, Development
   - Click "Save"

5. **Add Frontend API URL**
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://your-project-name.vercel.app/api`
   - Replace `your-project-name` with your actual Vercel project URL
   - **Environments:** Production, Preview
   - Click "Save"

### Step 3: Redeploy

After adding environment variables:

```bash
vercel --prod
```

Or trigger a redeploy from the Vercel dashboard.

---

## 🔑 Alternative: Using Vercel CLI

You can also add environment variables via CLI:

```bash
# Add API_KEY
vercel env add API_KEY

# When prompted:
# Environment: Production, Preview, Development (select all)
# Value: AIzaSyCOAy5xqbSX6IWNX7pYbcNB4VtX18FGBl8

# Add GEMINI_API_KEY
vercel env add GEMINI_API_KEY

# When prompted:
# Environment: Production, Preview, Development (select all)
# Value: AIzaSyCOAy5xqbSX6IWNX7pYbcNB4VtX18FGBl8
```

---

## 🛡️ API Key Rotation (Optional but Recommended)

For maximum security, periodically rotate your API key:

### When to Rotate
- Every 90 days
- If you suspect it's been exposed
- After a team member leaves
- Before open-sourcing your code

### How to Rotate

1. **Generate New Key**
   - Go to: https://makersuite.google.com/app/apikey
   - Click "Create API Key"
   - Copy new key

2. **Update Local .env**
   ```
   API_KEY=new_key_here
   GEMINI_API_KEY=new_key_here
   ```

3. **Update Vercel**
   - Dashboard → Settings → Environment Variables
   - Edit `API_KEY` and `GEMINI_API_KEY`
   - Paste new key
   - Redeploy

4. **Revoke Old Key**
   - Go back to https://makersuite.google.com/app/apikey
   - Delete the old key

---

## 🔍 Checking for Leaks

### Before Pushing to Git

```bash
# Check what files will be committed
git status

# Make sure .env is NOT listed
# If it is, add it to .gitignore immediately!
```

### Search Your Codebase

```bash
# Search for accidentally hardcoded keys
grep -r "AIzaSy" .

# Should ONLY find .env file
# If found in code files, remove immediately!
```

### Use Git Secrets (Optional)

Install git-secrets to prevent accidental commits:

```bash
# Install
npm install -g git-secrets

# Setup
git secrets --install
git secrets --register-aws

# Add custom pattern for Gemini keys
git secrets --add 'AIzaSy[0-9A-Za-z_-]{33}'
```

---

## 📊 API Key Usage Monitoring

Monitor your API usage to detect unauthorized access:

1. **Google Cloud Console**
   - https://console.cloud.google.com/
   - Go to "APIs & Services" → "Credentials"
   - Click on your API key
   - View "API key metrics"

2. **Set Up Alerts**
   - Create alerts for unusual usage spikes
   - Set daily quotas to prevent abuse

3. **Restrict API Key** (Recommended)

   In Google Cloud Console:
   - Click your API key
   - Under "API restrictions":
     - Select "Restrict key"
     - Choose "Generative Language API"
   - Under "Application restrictions":
     - Add your domain (after deployment)
     - Or use IP restrictions for backend

---

## 🚨 What to Do If Key is Exposed

### Immediate Actions

1. **Revoke the Key IMMEDIATELY**
   - https://makersuite.google.com/app/apikey
   - Delete the compromised key

2. **Generate New Key**
   - Create a new API key
   - Update `.env` locally
   - Update Vercel environment variables

3. **Check Usage Logs**
   - Review API usage for unauthorized requests
   - Check for unusual patterns

4. **Update and Redeploy**
   - Ensure new key is in place
   - Redeploy application

### If Committed to Git

1. **Revoke key immediately**
2. **Remove from Git history** (if public repo):
   ```bash
   # Use BFG Repo-Cleaner or git-filter-branch
   # This is complex - consider creating new repo instead
   ```
3. **Force push** (be careful!)
4. **Notify your team**

---

## ✅ Security Checklist

Before deploying to production:

- [x] API key stored in `.env` file
- [x] `.env` added to `.gitignore`
- [x] No hardcoded keys in source code
- [x] Vercel environment variables configured
- [ ] API key restricted to specific APIs in Google Cloud
- [ ] API key restricted to production domain
- [ ] Usage monitoring enabled
- [ ] Team knows not to commit `.env`

---

## 📚 Additional Resources

- **Vercel Environment Variables**: https://vercel.com/docs/environment-variables
- **Google Cloud API Keys**: https://cloud.google.com/docs/authentication/api-keys
- **git-secrets**: https://github.com/awslabs/git-secrets
- **12-Factor App Config**: https://12factor.net/config

---

## 💡 Summary

Your API key is now **securely configured** for local development:

✅ **Local:** Stored in `.env` (protected by `.gitignore`)
✅ **Git:** Won't be committed (in `.gitignore`)
✅ **Vercel:** Add via dashboard (never in code)

**Your API key will NEVER appear in:**
- Git commits
- GitHub repository
- Public code
- Vercel source code

**It will ONLY exist in:**
- Your local `.env` file
- Vercel's encrypted environment variables

**You're secure! 🔒**
