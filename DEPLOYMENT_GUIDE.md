# Harvest Tutor - Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Environment Variables](#environment-variables)
5. [Testing Locally](#testing-locally)
6. [Deploying to Vercel](#deploying-to-vercel)
7. [Important Notes](#important-notes)
8. [Troubleshooting](#troubleshooting)

---

## 📱 Project Overview

**Harvest Tutor** is an AI-powered agricultural assistant that helps farmers identify and treat crop diseases through:
- **Disease Detection**: Upload crop images for instant AI diagnosis
- **Educational Explanations**: GenAI-powered advice in simple language
- **Voice Guidance**: Text-to-speech in multiple Indian languages
- **Accessibility-First**: Designed for low-literacy users

**Tech Stack:**
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: Python serverless functions (Vercel)
- **ML Models**: TensorFlow/Keras for disease prediction
- **AI**: Google Gemini for explanations
- **Voice**: Google Text-to-Speech (gTTS)

---

## ✅ Prerequisites

Before you begin, ensure you have:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/

2. **Python** (v3.9 or higher)
   - Download from: https://www.python.org/

3. **Google Gemini API Key**
   - Get free API key from: https://makersuite.google.com/app/apikey
   - Save this key - you'll need it later

4. **Git** (for version control)
   - Download from: https://git-scm.com/

5. **Vercel Account** (free)
   - Sign up at: https://vercel.com/signup

---

## 🚀 Local Development Setup

### Step 1: Install Dependencies

#### Backend Dependencies
```bash
# Navigate to project root
cd c:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main

# Install Python dependencies
pip install -r requirements.txt
```

#### Frontend Dependencies
```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install
```

### Step 2: Configure Environment Variables

#### Backend Environment (.env)
Create a `.env` file in the **project root**:

```bash
# Create .env file in project root
cd c:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main
copy .env.example .env
```

Edit `.env` and add your Gemini API key:
```env
API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
MODEL_PATH=./models
AUDIO_OUTPUT_PATH=/tmp
```

#### Frontend Environment (.env.local)
Create `.env.local` in the **frontend** directory:

```bash
cd frontend
copy .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 3: Verify File Structure

Your directory should look like this:
```
harvest-tutor-main/
├── api/
│   ├── predict.py
│   ├── explain.py
│   └── voice.py
├── models/
│   ├── apple/
│   │   ├── keras_model.h5
│   │   └── labels.txt
│   ├── potato/
│   │   ├── keras_model.h5
│   │   └── labels.txt
│   └── tomato/
│       ├── keras_model.h5
│       └── labels.txt
├── services/
│   ├── disease_predictor.py
│   ├── genai_explainer.py
│   └── voice_generator.py
├── utils/
│   └── image_preprocessor.py
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── diagnose/
│   │   │       └── page.tsx
│   │   ├── components/
│   │   │   ├── ImageUpload.tsx
│   │   │   └── AudioPlayer.tsx
│   │   └── lib/
│   │       └── api.ts
│   ├── package.json
│   └── .env.local
├── .env
├── requirements.txt
└── vercel.json
```

---

## 🧪 Testing Locally

### Option 1: Run Frontend Only (Recommended for UI Testing)

```bash
cd frontend
npm run dev
```

Open browser at: http://localhost:3000

**Note**: API calls will fail without backend running, but you can test the UI.

### Option 2: Run Full Stack with Vercel CLI (Recommended for Full Testing)

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Run Development Server
```bash
# From project root
cd c:\Users\Tanay\Downloads\harvest-tutor-main\harvest-tutor-main
vercel dev
```

This starts:
- Frontend at http://localhost:3000
- API functions at http://localhost:3000/api/*

#### Test the Application
1. Open http://localhost:3000
2. Click "Start Diagnosis"
3. Select a crop (Tomato/Potato/Apple)
4. Choose language (English/Hindi/Telugu)
5. Upload a test image
6. Click "Analyze Crop"
7. View results, explanation, and listen to audio

---

## 🌐 Deploying to Vercel

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/harvest-tutor.git
   git push -u origin main
   ```

2. **Import Project to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add the following:
     - `API_KEY` = `your_gemini_api_key`
     - `GEMINI_API_KEY` = `your_gemini_api_key`
     - `NEXT_PUBLIC_API_URL` = `https://your-project.vercel.app/api`

4. **Deploy**
   - Click **Deploy**
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts to configure project
```

---

## ⚠️ Important Notes

### Model File Size Limitations

**Problem**: Vercel has a 250MB total deployment size limit. ML model files are large (~100MB+ each).

**Solutions**:

#### Option A: Use Vercel with Git LFS (Recommended)
1. Install Git LFS:
   ```bash
   git lfs install
   ```

2. Track model files:
   ```bash
   git lfs track "models/**/*.h5"
   ```

3. Commit and push:
   ```bash
   git add .gitattributes
   git add models/
   git commit -m "Add models with LFS"
   git push
   ```

#### Option B: Host Models on Cloud Storage
If models are too large, host them on:
- **Google Cloud Storage**
- **AWS S3**
- **Azure Blob Storage**

Then update `api/predict.py` to download models from cloud:
```python
import urllib.request

# Download model if not exists
if not os.path.exists(model_path):
    urllib.request.urlretrieve(
        'https://your-storage-url.com/keras_model.h5',
        model_path
    )
```

#### Option C: Use Quantized Models
Reduce model size using TensorFlow Lite:
```python
import tensorflow as tf

# Convert to TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
```

### Cold Start Issue

Serverless functions may have **cold starts** (2-5 second delay on first request).

**Solution**: Use Vercel's **Edge Functions** or keep functions warm with periodic pings.

### API Rate Limits

Google Gemini free tier has rate limits:
- **15 requests per minute**
- **1500 requests per day**

For production, consider upgrading to paid tier.

---

## 🐛 Troubleshooting

### Frontend doesn't start
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules .next
npm install
npm run dev
```

### "API_KEY not configured" error
- Ensure `.env` file exists in project root
- Check that `API_KEY` is set correctly
- For Vercel deployment, verify environment variables in dashboard

### Model loading fails
- Verify model files exist in `models/` directory
- Check file paths in `api/predict.py`
- Ensure models are not corrupted

### Audio not playing
- Check browser console for errors
- Verify `api/voice` endpoint is working
- Try different browser (Chrome/Firefox recommended)

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Verify all dependencies are in `requirements.txt` and `package.json`
- Ensure Python version is compatible (3.9+)

### "Module not found" errors
```bash
# Frontend
cd frontend
npm install [missing-package]

# Backend
pip install [missing-package]
pip freeze > requirements.txt
```

---

## 📞 Support

For issues or questions:
1. Check GitHub Issues (if repository is public)
2. Review Vercel documentation: https://vercel.com/docs
3. Check Next.js docs: https://nextjs.org/docs

---

## 🎉 Success Checklist

- [ ] Node.js and Python installed
- [ ] Dependencies installed (npm install & pip install)
- [ ] Environment variables configured (.env files)
- [ ] Gemini API key obtained and set
- [ ] Local development server runs successfully
- [ ] Can upload image and get prediction
- [ ] Explanation generates correctly
- [ ] Audio plays in multiple languages
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Production environment variables configured
- [ ] Production deployment works end-to-end

---

**Congratulations! 🌾 Your Harvest Tutor application is now ready to help farmers!**
