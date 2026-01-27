# Harvest Tutor 🌾

AI-powered crop disease diagnosis and treatment advisor designed for farmers. Features voice-first interface with multilingual support.

## ✨ Features

- 🔬 **Instant Disease Detection** - AI-powered image analysis using TensorFlow
- 🧠 **Educational Explanations** - GenAI-powered advice in simple language
- 🔊 **Voice Guidance** - Text-to-speech in 10+ Indian languages
- 🌍 **Multilingual** - English, Hindi, Telugu, Tamil, Bengali, Marathi, and more
- ♿ **Accessibility-First** - Designed for low-literacy users
- 📱 **Mobile-Responsive** - Works seamlessly on smartphones

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd harvest-tutor-main

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend
npm install

# Configure environment variables
cp .env.example .env
cp frontend/.env.local.example frontend/.env.local

# Add your Gemini API key to .env
# Add API URL to frontend/.env.local
```

### Run Locally

```bash
# Option 1: Frontend only (UI testing)
cd frontend
npm run dev

# Option 2: Full stack with Vercel CLI
npm install -g vercel
vercel dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Documentation

- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Complete setup and deployment instructions
- **[API Documentation](api/README.md)** - Backend API reference (if needed)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Python serverless functions (Vercel)
- **ML**: TensorFlow/Keras
- **AI**: Google Gemini
- **Voice**: Google Text-to-Speech

## 📊 Supported Crops

| Crop | Diseases Detected |
|------|------------------|
| 🍅 Tomato | 10+ disease types |
| 🥔 Potato | 8+ disease types |
| 🍎 Apple | 6+ disease types |

More crops coming soon!

## 🌐 Languages Supported

English • Hindi • Telugu • Tamil • Bengali • Marathi • Gujarati • Kannada • Malayalam • Punjabi

## 📁 Project Structure

```
harvest-tutor-main/
├── api/              # Backend serverless functions
├── models/           # ML models for disease prediction
├── frontend/         # Next.js frontend application
├── services/         # Python services
├── utils/            # Utility functions
└── vercel.json       # Vercel configuration
```

## 🚢 Deployment

Deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

Or follow the [Deployment Guide](DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📝 Environment Variables

### Backend (.env)
```env
API_KEY=your_gemini_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

For production, update `NEXT_PUBLIC_API_URL` to your Vercel domain.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built for Indian farmers with ❤️
- Powered by Google Gemini AI
- ML models trained on PlantVillage dataset

---

**Made with 🌾 for a better harvest**
