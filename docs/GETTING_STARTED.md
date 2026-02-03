# 🚀 Getting Started with CogniPrep

Complete step-by-step guide to set up and run CogniPrep locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Python 3.10+** - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)
- **MongoDB Atlas Account** (Free) - [Sign up](https://www.mongodb.com/cloud/atlas)

## 🗂️ Project Structure

```
Cogniprep/
├── backend/              # Node.js Express server
├── ai-service/           # Python FastAPI AI service
├── src/                  # React frontend
├── DEPLOYMENT.md         # Deployment guide
└── GETTING_STARTED.md    # This file
```

---

## ⚙️ Step 1: Clone the Repository

```bash
git clone https://github.com/Jaykaran24/Cogniprep.git
cd Cogniprep
```

---

## 🗄️ Step 2: Set Up MongoDB Atlas (Free Database)

### 2.1 Create a Free MongoDB Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Click **"Build a Database"**
4. Select **"M0 Free"** tier
5. Choose your preferred provider and region
6. Click **"Create Cluster"**

### 2.2 Create Database User

1. Click **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Create credentials:
   - Username: `cogniprep_user`
   - Password: Generate a secure password (save it!)
   - Privileges: **Read and write to any database**
4. Click **"Add User"**

### 2.3 Configure Network Access

1. Click **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - For development only. In production, restrict to specific IPs.
4. Click **"Confirm"**

### 2.4 Get Connection String

1. Go back to **"Database"** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string:
   ```
   mongodb+srv://cogniprep_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name `cogniprep`:
   ```
   mongodb+srv://cogniprep_user:your_password@cluster0.xxxxx.mongodb.net/cogniprep?retryWrites=true&w=majority
   ```

**Save this connection string!** You'll need it in the next step.

---

## 🖥️ Step 3: Set Up Backend (Node.js)

### 3.1 Navigate to Backend Directory

```bash
cd backend
```

### 3.2 Install Dependencies

```bash
npm install
```

This will install:
- Express (Web framework)
- Mongoose (MongoDB ORM)
- Socket.IO (WebSocket server)
- JWT (Authentication)
- And other dependencies

### 3.3 Create Environment File

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 3.4 Configure Environment Variables

Open `.env` in a text editor and update:

```env
NODE_ENV=development
PORT=5000

# MongoDB Connection String (from Step 2.4)
MONGODB_URI=mongodb+srv://cogniprep_user:your_password@cluster0.xxxxx.mongodb.net/cogniprep?retryWrites=true&w=majority

# JWT Secret (generate a random 32-byte hex string)
JWT_SECRET=your-generated-secret-key-here
JWT_EXPIRE=7d

# AI Service URL (we'll start this in Step 4)
AI_SERVICE_URL=http://localhost:8000

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3.5 Generate JWT Secret

Run this command to generate a secure JWT secret:

**Windows PowerShell:**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Mac/Linux:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` in `.env`.

### 3.6 Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📡 WebSocket server ready
✅ MongoDB connected successfully
```

**Keep this terminal open.** The backend is now running on http://localhost:5000

### 3.7 Test Backend

Open a new terminal and run:

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-13T...",
  "database": "connected"
}
```

---

## 🐍 Step 4: Set Up AI Service (Python)

### 4.1 Open New Terminal

Open a **new terminal window** (keep backend running).

### 4.2 Navigate to AI Service Directory

```bash
cd ai-service
```

### 4.3 Create Virtual Environment

**Windows:**
```powershell
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### 4.4 Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- FastAPI (Web framework)
- Whisper-tiny (Speech-to-text)
- Flan-T5-base (Feedback generation)
- Sentence Transformers (Semantic similarity)
- And other AI libraries

**Note:** This may take 5-10 minutes on first install.

### 4.5 Create Environment File

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 4.6 Configure Environment (Optional)

The default settings work fine for development. If needed, edit `.env`:

```env
ENV=development
HOST=0.0.0.0
PORT=8000
WHISPER_MODEL=tiny
SENTENCE_MODEL=all-MiniLM-L6-v2
LLM_MODEL=google/flan-t5-base
MODEL_CACHE_DIR=./models
```

### 4.7 Start AI Service

```bash
python main.py
```

**First run:** Models will download (takes 2-5 minutes):
```
🔄 Loading Whisper model...
✅ Whisper model 'tiny' loaded successfully
🔄 Loading Sentence Transformer model...
✅ Sentence Transformer 'all-MiniLM-L6-v2' loaded successfully
🔄 Loading LLM model...
✅ LLM model 'google/flan-t5-base' loaded successfully
```

**AI Service is now running on http://localhost:8000**

### 4.8 Test AI Service

Open a new terminal:

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "models": {
    "whisper": true,
    "sentence_transformer": true,
    "llm": true
  },
  "environment": "development"
}
```

**View API Documentation:** http://localhost:8000/docs

---

## ⚛️ Step 5: Set Up Frontend (React)

### 5.1 Open New Terminal

Open a **new terminal window** (keep backend and AI service running).

### 5.2 Navigate to Project Root

```bash
cd C:\Users\jayka\OneDrive\Pictures\Projects\Cogniprep
# Or wherever your project is located
```

### 5.3 Install Frontend Dependencies

```bash
npm install
```

This installs:
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Socket.IO Client
- Axios

### 5.4 Create Environment File (Optional)

For development, defaults work fine. If deploying, create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=http://localhost:5000
```

### 5.5 Start Frontend

```bash
npm run dev
```

Frontend is now running on http://localhost:3000

Browser should automatically open. If not, navigate to http://localhost:3000

---

## ✅ Step 6: Verify Everything is Working

You should have **3 terminals running**:

1. **Backend** (Port 5000) - Node.js Express + Socket.IO
2. **AI Service** (Port 8000) - Python FastAPI with AI models
3. **Frontend** (Port 3000) - React + Vite

### 6.1 Test the Application

1. **Open** http://localhost:3000
2. **Click** "Get Started" or "Sign Up"
3. **Create** an account:
   - Full Name: Test User
   - Email: test@example.com
   - Password: Test@123
4. **Sign In** with your credentials
5. **Navigate** to Dashboard
6. **Create** a mock interview
7. **Start** interview and answer questions
8. **Check** feedback generation

---

## 🎯 What's Next?

### Seed Sample Questions (Optional)

Currently, the database is empty. To add sample questions:

1. Create `backend/seeds/questions.seed.js`
2. Add sample questions for different roles
3. Run: `node backend/seeds/questions.seed.js`

### Common Issues & Solutions

#### Backend won't start
- **Check:** MongoDB connection string in `.env`
- **Verify:** MongoDB Atlas IP whitelist includes 0.0.0.0/0
- **Try:** Delete `node_modules` and run `npm install` again

#### AI Service errors
- **Check:** Python version is 3.10+
- **Verify:** Virtual environment is activated
- **Try:** `pip install --upgrade pip` then reinstall requirements

#### Frontend can't connect to backend
- **Check:** Backend is running on port 5000
- **Verify:** No CORS errors in browser console
- **Try:** Clear browser cache and reload

#### Models taking too long to load
- **First time:** Models download from internet (2-5 minutes)
- **Subsequent runs:** Models load from cache (10-30 seconds)
- **Solution:** Pre-download models (see AI Service README)

---

## 📚 Learn More

- **Backend API:** http://localhost:5000/api/health
- **AI Service API Docs:** http://localhost:8000/docs
- **Frontend:** http://localhost:3000

### Documentation

- [Backend README](backend/README.md) - API endpoints and architecture
- [AI Service README](ai-service/README.md) - Models and optimization
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production for free

### Project Structure

```
Cogniprep/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth, validation, errors
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── sockets/          # WebSocket handlers
│   └── server.js         # Main entry point
├── ai-service/
│   ├── models/           # AI model loaders
│   ├── routers/          # FastAPI endpoints
│   └── main.py           # FastAPI app
├── src/
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   ├── services/         # API clients
│   └── App.jsx           # Main React app
└── ...
```

---

## 🐛 Troubleshooting

### Port Already in Use

If you get "Port already in use" errors:

**Windows:**
```powershell
# Find process on port 5000
netstat -ano | findstr :5000
# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Timeout

1. Check internet connection
2. Verify MongoDB Atlas credentials
3. Ensure IP whitelist includes 0.0.0.0/0
4. Try restarting MongoDB Atlas cluster

### Python Package Installation Errors

```bash
# Upgrade pip first
pip install --upgrade pip

# Install with verbose output
pip install -r requirements.txt --verbose

# If still failing, install packages individually
pip install fastapi
pip install uvicorn
# ...continue for each package
```

---

## 🎉 Success!

You now have CogniPrep running locally with:

✅ Complete backend API with authentication  
✅ AI-powered feedback generation  
✅ Real-time WebSocket communication  
✅ Beautiful React frontend  
✅ MongoDB database  

**Start practicing for your interviews!** 🚀

---

## 📞 Need Help?

- **Issues:** [GitHub Issues](https://github.com/Jaykaran24/Cogniprep/issues)
- **Email:** your.email@example.com
- **Documentation:** Check README files in each folder

---

**Happy Coding!** 💻✨
