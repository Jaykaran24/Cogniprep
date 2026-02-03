# CogniPrep 🎯

**Intelligent Preparation. Data-Driven Success.**

AI-powered mock interview platform that helps you ace your technical interviews with real-time feedback, behavioral analysis, and adaptive question selection.

![CogniPrep Banner](https://via.placeholder.com/1200x400/0ea5e9/ffffff?text=CogniPrep+-+AI+Interview+Preparation)

## 🌟 Features

### 🎙️ Real-Time Speech-to-Text
- Powered by OpenAI Whisper (tiny model)
- Instant transcription during interviews
- CPU-optimized for fast processing

### 🤖 AI-Powered Feedback
- Detailed analysis of technical answers
- Communication and behavioral metrics
- Personalized improvement suggestions

### 📊 Performance Analytics
- Track progress over time
- Category-wise performance breakdown
- Identify strengths and weaknesses

### 🏆 Global Leaderboard
- Compete with peers worldwide
- Role-specific rankings
- Motivate continuous improvement

### 🎯 Adaptive Questions
- Questions adjust to your skill level
- Never see the same question twice
- 500+ curated technical questions

### 💼 Resume Analyzer
- Upload and analyze your resume
- Get improvement suggestions
- ATS compatibility check

### 🎨 Beautiful UI
- Glassmorphism design
- Dark/Light mode
- Smooth animations with Framer Motion
- Fully responsive

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────────┐
│  React Frontend │─────▶│  Node.js Backend │─────▶│  Python AI Service  │
│   (Vite + React)│      │  (Express + IO)  │      │  (FastAPI + Models) │
└─────────────────┘      └──────────────────┘      └─────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  MongoDB Atlas      │
                         │  (Free Tier 512MB)  │
                         └─────────────────────┘
```

## 🚀 Tech Stack

### Frontend
- ⚛️ **React 18** - UI Library
- ⚡ **Vite** - Build tool
- 🎨 **Tailwind CSS** - Styling
- 🎬 **Framer Motion** - Animations
- 🔌 **Socket.IO Client** - Real-time communication
- 🗺️ **React Router v6** - Routing

### Backend
- 🟢 **Node.js + Express** - Server
- 🔌 **Socket.IO** - WebSocket server
- 📦 **MongoDB + Mongoose** - Database
- 🔐 **JWT** - Authentication
- 🛡️ **Helmet + CORS** - Security

### AI Service
- 🐍 **Python + FastAPI** - AI API
- 🎙️ **Whisper-tiny** - Speech-to-text
- 🧠 **Flan-T5-base** - Feedback generation
- 📊 **all-MiniLM-L6-v2** - Semantic similarity
- 💻 **CPU-optimized** - No GPU required

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- MongoDB Atlas account (free)

### 1. Clone Repository

```bash
git clone https://github.com/Jaykaran24/Cogniprep.git
cd Cogniprep
```

### 2. Set Up Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start backend
npm run dev
```

Backend runs on http://localhost:5000

### 3. Set Up AI Service

```bash
cd ai-service
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Start AI service
python main.py
```

AI Service runs on http://localhost:8000

### 4. Set Up Frontend

```bash
cd Cogniprep  # Root directory
npm install

# Start frontend
npm run dev
```

Frontend runs on http://localhost:3000

## 🌐 Deployment (Free Tier)

Deploy the entire stack for **$0/month** using free tier services:

1. **Frontend** → Vercel (Free)
2. **Backend** → Railway ($5 credit/month) or Render (Free with sleep)
3. **AI Service** → Hugging Face Spaces (Free, no sleep!)
4. **Database** → MongoDB Atlas (Free 512MB)

📖 **Full deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

## 📸 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x500/0ea5e9/ffffff?text=Landing+Page)

### Interview Session
![Interview](https://via.placeholder.com/800x500/8b5cf6/ffffff?text=Live+Interview)

### Feedback Dashboard
![Feedback](https://via.placeholder.com/800x500/10b981/ffffff?text=AI+Feedback)

### Analytics
![Analytics](https://via.placeholder.com/800x500/ec4899/ffffff?text=Performance+Analytics)

## 🎯 Usage

### 1. Sign Up
Create a free account with your email

### 2. Set Up Profile
Choose your target role (Frontend, Backend, Full Stack, etc.)

### 3. Start Interview
- Select interview type (Technical, Behavioral, Mixed)
- Choose difficulty level
- Set duration

### 4. Answer Questions
- Speak your answers (or type)
- Get real-time transcription
- AI analyzes your responses

### 5. Get Feedback
- Detailed scores for each question
- Overall performance summary
- Personalized improvement tips

### 6. Track Progress
- View analytics dashboard
- Compare with leaderboard
- Identify areas for growth

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name](https://github.com/Jaykaran24)
- **Project**: 6th Semester CS Project

## 🙏 Acknowledgments

- OpenAI for Whisper model
- Google for Flan-T5 model
- Sentence Transformers community
- MongoDB Atlas for free database hosting
- Hugging Face for free AI hosting

## 📧 Contact

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- GitHub: [@Jaykaran24](https://github.com/Jaykaran24)

## ⭐ Star History

If you find this project helpful, please consider giving it a star! ⭐

---

**Made with ❤️ for interview preparation**

**Total Cost**: $0/month | **Impact**: Unlimited practice for everyone! 🚀
