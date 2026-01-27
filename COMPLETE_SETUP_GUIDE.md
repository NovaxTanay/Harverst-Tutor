# Complete Setup Guide - Harvest Tutor

This guide covers **both** Python backend and Next.js frontend setup.

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Setup Python backend
setup-python-env.bat

# 2. Setup frontend
setup-frontend.bat

# 3. Get Gemini API key from: https://makersuite.google.com/app/apikey

# 4. Create .env file with your API key

# 5. Run the app (choose one):
# Option A: Frontend only
cd frontend && npm run dev

# Option B: Full stack (requires Vercel CLI)
vercel dev
```

---

## 📋 System Requirements

### Required Software
- ✅ **Python 3.10.x** (You have 3.10.6 - Perfect!)
- ✅ **Node.js 18+** (Download from https://nodejs.org/)
- ✅ **Git** (Download from https://git-scm.com/)
- ✅ **Google Gemini API Key** (Free from https://makersuite.google.com/app/apikey)

### Optional
- **Vercel CLI** (for full-stack local testing)
  ```bash
  npm install -g vercel
  ```

---

## 🔧 Part 1: Python Backend Setup

### Option A: Automated Setup (Recommended)

**Just double-click:** `setup-python-env.bat`

This will:
1. Create a fresh virtual environment (`venv_harvest`)
2. Install all Python dependencies
3. Verify TensorFlow installation

### Option B: Manual Setup

```bash
# 1. Create virtual environment
python -m venv venv_harvest

# 2. Activate it
venv_harvest\Scripts\activate

# 3. Upgrade pip
python -m pip install --upgrade pip

# 4. Install dependencies
pip install -r requirements.txt

# 5. Verify TensorFlow
python -c "import tensorflow as tf; print(tf.__version__)"
```

### If TensorFlow Installation Fails

Try CPU-only version:
```bash
pip install tensorflow-cpu==2.12.0
```

Or see `PYTHON_SETUP_GUIDE.md` for detailed troubleshooting.

---

## 🎨 Part 2: Frontend Setup

### Option A: Automated Setup (Recommended)

**Just double-click:** `setup-frontend.bat`

This will:
1. Install Node.js dependencies
2. Create `.env.local` file
3. Set up the development environment

### Option B: Manual Setup

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create environment file
copy .env.local.example .env.local

# 4. Edit .env.local if needed (default should work for local development)
```

### If npm install fails

```bash
# Clear cache and retry
cd frontend
rd /s /q node_modules
del package-lock.json
npm install
```

### Frontend Lint Errors

**The TypeScript errors you're seeing are normal** before running `npm install`:
- "Cannot find module 'next'" → Fixed by `npm install`
- "JSX element implicitly has type 'any'" → Fixed by `npm install`

**Just run:** `npm install` and they will disappear!

---

## 🔑 Part 3: API Keys and Environment Variables

### Backend Environment Variables

Create `.env` in **project root**:

```env
# Google Gemini API Key (REQUIRED)
API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Optional settings
MODEL_PATH=./models
AUDIO_OUTPUT_PATH=/tmp
```

**Get your Gemini API key:**
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key
5. Paste it into `.env` file

### Frontend Environment Variables

Create `.env.local` in **frontend** directory:

```env
# For local development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# For production (after Vercel deployment)
# NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api
```

---

## 🚀 Part 4: Running the Application

### Method 1: Frontend Only (UI Testing)

**Best for**: Testing the user interface

```bash
cd frontend
npm run dev
```

Open: http://localhost:3000

**Note**: API calls won't work without backend, but you can test the UI.

---

### Method 2: Full Stack with Vercel CLI (Recommended)

**Best for**: Testing complete functionality

```bash
# Install Vercel CLI globally (one-time)
npm install -g vercel

# Run development server from project root
vercel dev
```

This starts:
- ✅ Frontend at http://localhost:3000
- ✅ API functions at http://localhost:3000/api/*

**First time setup**: Vercel will ask some questions:
- "Set up and develop?" → Yes
- "Which scope?" → Your account
- "Link to existing project?" → No
- "Project name?" → harvest-tutor (or your choice)

---

### Method 3: Manual Backend + Frontend

**Terminal 1 - Backend** (if you have Flask/FastAPI server):
```bash
venv_harvest\Scripts\activate
python app.py  # or your backend server
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm run dev
```

---

## ✅ Verification Checklist

### Python Backend
- [ ] Python 3.10.x installed (`python --version`)
- [ ] Virtual environment created and activated
- [ ] TensorFlow imports successfully
- [ ] `.env` file created with API key
- [ ] Model files exist in `models/` directory

**Test**:
```bash
venv_harvest\Scripts\activate
python -c "import tensorflow as tf; print('TensorFlow works!')"
```

### Frontend
- [ ] Node.js installed (`node --version`)
- [ ] npm dependencies installed (`node_modules` folder exists)
- [ ] `.env.local` file created
- [ ] Dev server starts without errors
- [ ] Can access http://localhost:3000

**Test**:
```bash
cd frontend
npm run dev
# Should start without errors
```

### Full Integration
- [ ] Can upload an image
- [ ] Image prediction returns a disease name
- [ ] Explanation generates in selected language
- [ ] Audio plays correctly
- [ ] Download audio works

---

## 🐛 Common Issues

### Issue 1: "Python not found"
**Fix**: Add Python to PATH or reinstall Python with "Add to PATH" checked

### Issue 2: "npm not found"  
**Fix**: Install Node.js from nodejs.org

### Issue 3: TensorFlow won't install
**Fix**: 
```bash
pip install tensorflow-cpu==2.12.0
```
See `PYTHON_SETUP_GUIDE.md` for more details.

### Issue 4: Frontend shows TypeScript errors
**Fix**: 
```bash
cd frontend
npm install
```
Restart VS Code after installation.

### Issue 5: "Cannot find module '@/components/...'"
**Fix**: 
```bash
cd frontend
npm install
```
Then restart your IDE.

### Issue 6: Port 3000 already in use
**Fix**:
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill that process
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Issue 7: Virtual environments in project causing conflicts
**Fix**:
```bash
# Delete old virtual environments
rd /s /q venv venv310 tf_env

# Create fresh one
python -m venv venv_harvest
venv_harvest\Scripts\activate
pip install -r requirements.txt
```

---

## 📁 Directory Structure After Setup

```
harvest-tutor-main/
├── venv_harvest/           # Python virtual environment (created by setup)
├── api/                    # Backend API functions
├── models/                 # ML models
├── services/               # Python services
├── frontend/
│   ├── node_modules/      # Node.js packages (created by npm install)
│   ├── .env.local         # Frontend environment variables
│   └── src/               # Source code
├── .env                    # Backend environment variables
└── requirements.txt        # Python dependencies
```

---

## 📚 Additional Resources

- **Python Setup**: See `PYTHON_SETUP_GUIDE.md`
- **Frontend Fixes**: See `FRONTEND_FIXES.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Quick Reference**: See `QUICK_REFERENCE.md`

---

## 🎓 Step-by-Step First Time Setup

### Complete Walkthrough

```bash
# Step 1: Open PowerShell in project directory
cd c:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main

# Step 2: Setup Python environment
.\setup-python-env.bat
# Wait for it to complete

# Step 3: Setup frontend
.\setup-frontend.bat
# Wait for it to complete

# Step 4: Get API key
# Open browser: https://makersuite.google.com/app/apikey
# Sign in and create API key

# Step 5: Create .env file
echo API_KEY=your_api_key_here > .env
echo GEMINI_API_KEY=your_api_key_here >> .env

# Step 6: Install Vercel CLI
npm install -g vercel

# Step 7: Run the app
vercel dev

# Step 8: Open browser
start http://localhost:3000
```

---

## 🎉 Success!

If you can:
1. ✅ Open http://localhost:3000
2. ✅ See the landing page
3. ✅ Navigate to /diagnose
4. ✅ Upload an image
5. ✅ Get a disease prediction
6. ✅ See an explanation
7. ✅ Hear audio playback

**Congratulations! Everything is working correctly! 🌾**

---

## 📞 Still Need Help?

1. Check the specific error message
2. See relevant guide:
   - Python issues → `PYTHON_SETUP_GUIDE.md`
   - Frontend issues → `FRONTEND_FIXES.md`
   - Deployment → `DEPLOYMENT_GUIDE.md`
3. Make sure you followed all steps in order
4. Try the automated setup scripts first

---

**Your Current Status:**
- ✅ Python 3.10.6 (Perfect!)
- ✅ Compatible with TensorFlow 2.12.0
- ⚠️ Need to install npm packages (run setup-frontend.bat)
- ⚠️ Need to create .env file with API key

**Next Step:** Run `setup-frontend.bat` to fix the TypeScript errors!
