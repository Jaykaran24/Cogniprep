# 🎯 CogniPrep - AI-Powered Mock Interview Platform

AI-driven interview preparation platform with real-time feedback, speech-to-text transcription, and performance analytics.

## 📁 Project Structure

```
Cogniprep/
├── frontend/           # React + Vite frontend application
│   ├── src/           # Source code (components, pages, services)
│   ├── package.json   # Frontend dependencies
│   └── vite.config.js # Vite configuration
│
├── backend/           # Node.js + Express API server
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── controllers/   # Request handlers
│   ├── sockets/       # WebSocket handlers
│   ├── middleware/    # Auth, validation, errors
│   ├── scripts/       # Database seeding
│   └── server.js      # Main entry point
│
├── ai-service/        # Python FastAPI AI service
│   ├── models/        # AI model loaders
│   ├── routers/       # API endpoints
│   └── main.py        # FastAPI application
│
└── docs/              # Documentation
    ├── GETTING_STARTED.md
    ├── DEPLOYMENT.md
    └── PROJECT_README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB Atlas account (free)

### 1. Backend Setup
```bash
cd backend
npm install
copy .env.example .env    # Windows
# Edit .env with your MongoDB URI
npm run dev               # Starts on port 5000
```

### 2. AI Service Setup
```bash
cd ai-service
python -m venv venv
venv\Scripts\activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env    # Windows
python main.py            # Starts on port 8000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev               # Starts on port 3000
```

### 4. Seed Database
```bash
cd backend
node scripts/seedQuestions.js
```

## 📚 Documentation

- [Getting Started Guide](docs/GETTING_STARTED.md) - Complete setup instructions
- [Deployment Guide](docs/DEPLOYMENT.md) - Deploy to production (free tier)
- [Project Documentation](docs/PROJECT_README.md) - Architecture & API reference

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Socket.IO Client
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication

**AI Service:**
- Python + FastAPI
- Whisper (speech-to-text)
- Flan-T5 (feedback generation)
- Sentence Transformers (semantic analysis)

## ✨ Features

- ✅ Real-time AI interviews with live transcription
- ✅ Intelligent feedback generation
- ✅ Performance analytics & progress tracking
- ✅ Global leaderboard
- ✅ Multiple interview categories (Frontend, Backend, Full Stack, DevOps, Data Science)
- ✅ 100+ curated interview questions
- ✅ Adaptive difficulty levels

## 🎓 6th Semester CS Project

Built for academic purposes as a comprehensive full-stack application demonstrating:
- Modern web development practices
- AI/ML integration
- Real-time communication
- Database design
- Authentication & authorization
- RESTful API design
- Microservices architecture

## 📄 License

MIT License - Feel free to use for learning purposes

## 🤝 Contributing

This is an academic project. Feel free to fork and extend!

---

**Made with ❤️ for interview preparation**
