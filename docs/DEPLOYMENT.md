# CogniPrep - Complete Deployment Guide

Complete guide for deploying CogniPrep on free-tier services.

## 🎯 Architecture Overview

```
[Frontend - React]           [Backend - Node.js]           [AI Service - Python]
Vercel (Free)       <--->    Railway/Render (Free)  <--->  Hugging Face Spaces (Free)
                                      ↓
                             [MongoDB Atlas (Free)]
```

## 📋 Prerequisites

1. GitHub account
2. Vercel account
3. Railway or Render account
4. Hugging Face account
5. MongoDB Atlas account

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

### 1.1 Create Account & Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Click "Build a Database"
4. Select **M0 Free** tier
   - Provider: AWS
   - Region: Choose closest to your users
   - Cluster Name: `cogniprep-cluster`
5. Click "Create"

### 1.2 Create Database User

1. Go to "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Authentication Method: Password
4. Username: `cogniprep_admin`
5. Password: Generate secure password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

### 1.3 Configure Network Access

1. Go to "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, restrict to specific IPs
4. Click "Confirm"

### 1.4 Get Connection String

1. Go to "Database" → Click "Connect"
2. Choose "Connect your application"
3. Driver: Node.js, Version: 5.5 or later
4. Copy connection string:
   ```
   mongodb+srv://cogniprep_admin:<password>@cogniprep-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name: `cogniprep`
   ```
   mongodb+srv://cogniprep_admin:your_password@cogniprep-cluster.xxxxx.mongodb.net/cogniprep?retryWrites=true&w=majority
   ```

---

## 🐍 Step 2: Deploy AI Service (Hugging Face Spaces)

### 2.1 Prepare AI Service

1. Create `Dockerfile` in `ai-service/`:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download models to reduce cold start
RUN python -c "import whisper; whisper.load_model('tiny')"
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# Copy application
COPY . .

# Expose port
EXPOSE 7860

# Start application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
```

2. Update `main.py` port for Hugging Face:

```python
if __name__ == "__main__":
    port = int(os.getenv("PORT", 7860))  # Hugging Face uses 7860
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False
    )
```

### 2.2 Deploy to Hugging Face Spaces

1. Go to [Hugging Face](https://huggingface.co/spaces)
2. Click "Create new Space"
3. Space name: `cogniprep-ai`
4. License: Apache-2.0
5. SDK: **Docker**
6. Click "Create Space"

7. Upload files:
   - All files from `ai-service/` folder
   - Including `Dockerfile`

8. Wait for build (5-10 minutes first time)

9. Your AI service URL: `https://YOUR-USERNAME-cogniprep-ai.hf.space`

10. Test: `https://YOUR-USERNAME-cogniprep-ai.hf.space/health`

---

## 🖥️ Step 3: Deploy Backend (Railway or Render)

### Option A: Railway (Recommended)

#### 3.1 Prepare Backend

1. Push your code to GitHub
2. Make sure `.gitignore` includes `.env`

#### 3.2 Deploy

1. Go to [Railway.app](https://railway.app/)
2. Sign in with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your `Cogniprep` repository
6. It will detect Node.js automatically

#### 3.3 Configure Environment Variables

1. In Railway dashboard, click your service
2. Go to "Variables" tab
3. Add variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-256-bit-secret-key
JWT_EXPIRE=7d
AI_SERVICE_URL=https://YOUR-USERNAME-cogniprep-ai.hf.space
FRONTEND_URL=https://your-app.vercel.app
```

Generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 3.4 Configure Start Command

1. Railway should auto-detect `package.json`
2. If not, set:
   - Build Command: `npm install`
   - Start Command: `npm start`

#### 3.5 Get Backend URL

After deployment: `https://your-app.up.railway.app`

---

### Option B: Render

#### 3.1 Deploy

1. Go to [Render.com](https://render.com/)
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Settings:
   - Name: `cogniprep-backend`
   - Region: Choose closest
   - Branch: `primary` or `main`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: **Free**

#### 3.2 Add Environment Variables

Same as Railway (Step 3.3 above)

#### 3.3 Get Backend URL

After deployment: `https://cogniprep-backend.onrender.com`

**Note**: Free tier sleeps after 15 min inactivity. First request takes 30-60 seconds to wake up.

---

## ⚛️ Step 4: Deploy Frontend (Vercel)

### 4.1 Prepare Frontend

1. Create `.env.production` in root:

```env
VITE_API_URL=https://your-backend-url
VITE_WS_URL=wss://your-backend-url
```

Replace with your actual Railway/Render URL.

### 4.2 Update Frontend Code

Create `src/config/api.js`:

```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';
```

### 4.3 Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel.com](https://vercel.com/)
3. Sign in with GitHub
4. Click "Add New..." → "Project"
5. Import your repository
6. Framework Preset: **Vite**
7. Root Directory: `./` (leave as is)
8. Build Command: `npm run build`
9. Output Directory: `dist`
10. Install Command: `npm install`

### 4.4 Add Environment Variables

In Vercel project settings:
1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   VITE_API_URL=https://your-backend-url
   VITE_WS_URL=wss://your-backend-url
   ```

### 4.5 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app: `https://your-app.vercel.app`

### 4.6 Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed

---

## ✅ Step 5: Final Configuration

### 5.1 Update Backend CORS

In `backend/server.js`, update CORS to include your Vercel URL:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app'
  ],
  credentials: true
}));
```

### 5.2 Update Socket.IO CORS

```javascript
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://your-app.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});
```

### 5.3 Redeploy Backend

Commit and push changes. Railway/Render will auto-redeploy.

---

## 🧪 Step 6: Test Everything

### 6.1 Test AI Service
```bash
curl https://YOUR-USERNAME-cogniprep-ai.hf.space/health
```

Expected:
```json
{
  "status": "healthy",
  "models": {
    "whisper": true,
    "sentence_transformer": true,
    "llm": true
  }
}
```

### 6.2 Test Backend
```bash
curl https://your-backend-url/api/health
```

Expected:
```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "..."
}
```

### 6.3 Test Frontend

1. Open `https://your-app.vercel.app`
2. Sign up with test account
3. Create an interview
4. Answer questions
5. Check feedback generation

---

## 💰 Cost Breakdown (Free Tier Limits)

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **MongoDB Atlas** | M0 Cluster | 512MB storage, Shared CPU |
| **Hugging Face Spaces** | Docker Space | 2 CPU cores, 16GB RAM, No sleep |
| **Railway** | Hobby Plan | $5 credit/month (~500 hours) |
| **Render** | Free | 750 hours/month, Sleeps after 15min |
| **Vercel** | Hobby | Unlimited deploys, 100GB bandwidth |

**Total Monthly Cost**: $0 (using Render + all other free tiers)

---

## 🚨 Troubleshooting

### Backend Can't Connect to MongoDB
- Check MongoDB Atlas IP whitelist (0.0.0.0/0 for testing)
- Verify connection string in environment variables
- Check MongoDB Atlas user permissions

### AI Service Slow on First Request
- Hugging Face Spaces don't sleep, but models load on first use
- Consider pre-warming: Add health check cron job

### WebSocket Connection Fails
- Verify FRONTEND_URL in backend env vars
- Check CORS settings in server.js
- Use `wss://` (not `ws://`) for HTTPS backends

### Render Free Tier Sleeps
- First request after 15min takes 30-60s
- Show "Waking up service..." message in frontend
- Upgrade to Render $7/month for always-on

---

## 📊 Monitoring

### Vercel Analytics
1. Go to Vercel Dashboard → Analytics
2. View visitor stats, performance

### Railway Logs
1. Railway Dashboard → Your Service → Logs
2. Real-time logs and metrics

### MongoDB Atlas Monitoring
1. Atlas Dashboard → Metrics
2. View database operations, connections

---

## 🔒 Security Checklist

- [x] Environment variables not in code
- [x] JWT secret is random 256-bit key
- [x] MongoDB connection string secured
- [x] CORS restricted to frontend URL
- [x] Rate limiting enabled
- [x] Helmet security headers
- [x] Password hashing with bcrypt
- [ ] Add HTTPS redirect (Vercel handles this)
- [ ] Add CSP headers (optional)

---

## 📈 Scaling (When You Outgrow Free Tier)

### When to Upgrade:

1. **MongoDB** - Upgrade when > 400MB data
   - M2 tier: $9/month (2GB storage)

2. **Railway** - Upgrade when > $5 credit/month
   - Hobby plan: $5/month baseline + usage

3. **Render** - Upgrade for no sleep
   - Starter plan: $7/month (always-on)

4. **Hugging Face** - Upgrade for GPU
   - A10G GPU: $0.60/hour (only when needed)

---

## 🎉 You're Live!

Your CogniPrep platform is now deployed and accessible worldwide!

**Frontend**: https://your-app.vercel.app  
**Backend API**: https://your-backend-url/api  
**AI Service**: https://YOUR-USERNAME-cogniprep-ai.hf.space

Share your project and start helping people prepare for interviews! 🚀

---

## 📝 Next Steps

1. Add Google Analytics to frontend
2. Set up error monitoring (Sentry free tier)
3. Create demo video for README
4. Share on LinkedIn/Twitter
5. Submit to Product Hunt
6. Add to your portfolio

**Total Investment**: $0/month 💰
**Impact**: Unlimited interview practice for everyone! 🎯
