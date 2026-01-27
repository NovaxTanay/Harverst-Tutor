# Harvest Tutor - Quick Reference

## 🚀 Quick Start Commands

### Local Development

```bash
# 1. Install dependencies
pip install -r requirements.txt
cd frontend && npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env and add your Gemini API key

cp frontend/.env.local.example frontend/.env.local
# Keep default API_URL for local development

# 3. Run development server (choose one)

# Option A: Frontend only (UI testing)
cd frontend
npm run dev
# Visit: http://localhost:3000

# Option B: Full stack (recommended)
npm install -g vercel
vercel dev
# Visit: http://localhost:3000
```

### Deployment to Vercel

```bash
# 1. Login to Vercel
vercel login

# 2. Deploy
vercel --prod

# 3. Add environment variables in Vercel dashboard:
# - API_KEY = your_gemini_api_key
# - NEXT_PUBLIC_API_URL = https://your-app.vercel.app/api
```

---

## 📁 Key Files Reference

| File | Purpose |
|------|---------|
| `api/predict.py` | Disease prediction endpoint |
| `api/explain.py` | GenAI explanation endpoint |
| `api/voice.py` | Text-to-speech endpoint |
| `frontend/src/app/page.tsx` | Landing page |
| `frontend/src/app/diagnose/page.tsx` | Main diagnosis interface |
| `frontend/src/components/ImageUpload.tsx` | Image upload component |
| `frontend/src/components/AudioPlayer.tsx` | Audio player component |
| `frontend/src/lib/api.ts` | API client |
| `vercel.json` | Vercel deployment config |
| `.env` | Backend environment variables |
| `frontend/.env.local` | Frontend environment variables |

---

## 🌐 API Endpoints

### POST /api/predict
Predicts disease from crop image.

**Request**:
```json
{
  "image": "base64_string",
  "crop": "Tomato"
}
```

**Response**:
```json
{
  "success": true,
  "disease": "Early Blight",
  "confidence": 0.95
}
```

### POST /api/explain
Generates explanation using Google Gemini.

**Request**:
```json
{
  "crop": "Tomato",
  "disease": "Early Blight",
  "language": "Hindi"
}
```

**Response**:
```json
{
  "success": true,
  "explanation": "..."
}
```

### POST /api/voice
Converts text to speech.

**Request**:
```json
{
  "text": "Your explanation text",
  "language": "Hindi"
}
```

**Response**:
```json
{
  "success": true,
  "audioBase64": "..."
}
```

---

## 🎨 Design System

### Colors
- Primary Green: `#2e7d32`
- Accent Gold: `#ffa726`
- Background: Gradient from `#1b5e20` to `#4caf50`

### Typography
- Headings: Poppins (700, 600, 500)
- Body: Inter (400, 500)

### Animations
- Fade in: 0.5s
- Slide up: 0.5s
- Hover scale: 1.05
- Transition: 300ms

---

## ⚙️ Environment Variables

### Backend (.env)
```env
API_KEY=your_gemini_api_key
GEMINI_API_KEY=your_gemini_api_key
MODEL_PATH=./models
AUDIO_OUTPUT_PATH=/tmp
```

### Frontend (.env.local)
```env
# Local development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Production (update after Vercel deployment)
NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api
```

---

## 🐛 Common Issues & Fixes

### "Module not found" error
```bash
# Frontend
cd frontend
npm install

# Backend
pip install -r requirements.txt
```

### "API_KEY not configured"
- Ensure `.env` file exists in project root
- Verify API key is set correctly
- For Vercel: Check environment variables in dashboard

### Frontend won't start
```bash
cd frontend
rm -rf node_modules .next
npm install
npm run dev
```

### Model loading fails
- Verify model files exist in `models/` directory
- Check file sizes (should be ~100MB each)
- Ensure correct paths in `api/predict.py`

---

## 📊 Supported Features

### Crops
- 🍅 Tomato (10+ diseases)
- 🥔 Potato (8+ diseases)
- 🍎 Apple (6+ diseases)

### Languages
- English 🇬🇧
- Hindi 🇮🇳
- Telugu 🇮🇳
- Tamil 🇮🇳
- Bengali 🇮🇳
- Marathi 🇮🇳
- Gujarati 🇮🇳
- Kannada 🇮🇳
- Malayalam 🇮🇳
- Punjabi 🇮🇳

---

## 📖 Documentation

- [README.md](file:///c:/Users/Tanay/Downloads/harvest-tutor-main/harvest-tutor-main/README.md) - Project overview
- [DEPLOYMENT_GUIDE.md](file:///c:/Users/Tanay/Downloads/harvest-tutor-main/harvest-tutor-main/DEPLOYMENT_GUIDE.md) - Comprehensive deployment instructions
- [walkthrough.md](file:///C:/Users/Tanay/.gemini/antigravity/brain/004009a5-6c0b-4d0c-9f5a-1074474460ed/walkthrough.md) - Implementation walkthrough

---

## 🎯 Testing Checklist

- [ ] Frontend loads at http://localhost:3000
- [ ] Landing page displays correctly
- [ ] Can navigate to /diagnose page
- [ ] Can select crop (Tomato/Potato/Apple)
- [ ] Can select language
- [ ] Can upload image (drag & drop or click)
- [ ] Image preview displays
- [ ] "Analyze Crop" button works
- [ ] Disease prediction returns result
- [ ] Explanation generates in selected language
- [ ] Audio player appears
- [ ] Audio plays correctly
- [ ] Can download audio
- [ ] Mobile responsive design works
- [ ] Vercel deployment successful
- [ ] Production API endpoints work

---

**For detailed instructions, see [DEPLOYMENT_GUIDE.md](file:///c:/Users/Tanay/Downloads/harvest-tutor-main/harvest-tutor-main/DEPLOYMENT_GUIDE.md)**
