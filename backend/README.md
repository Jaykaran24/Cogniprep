# CogniPrep Backend

AI-powered mock interview platform backend built with Node.js, Express, MongoDB, and Socket.IO.

## 🚀 Features

- **JWT Authentication** - Secure user registration and login
- **MongoDB Integration** - MongoDB Atlas free tier compatible
- **Real-time WebSockets** - Socket.IO for live interviews and feedback
- **RESTful API** - Complete CRUD operations for users, interviews, questions
- **AI Integration** - Connects to Python AI service for feedback generation
- **Analytics** - Performance tracking and leaderboards
- **Zero Cost** - Designed to run on free tier services

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (free tier)
- Python AI service running (see `/ai-service` folder)

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
NODE_ENV=development
PORT=5000

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cogniprep?retryWrites=true&w=majority

# JWT Secret (generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-256-bit-secret-key-here
JWT_EXPIRE=7d

# AI Service URL
AI_SERVICE_URL=http://localhost:8000

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Set Up MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and new project
3. Create a free cluster (M0 Sandbox - 512MB storage)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<username>` and `<password>` in the connection string
7. Add your IP address to the whitelist (or use 0.0.0.0/0 for testing)

### 4. Seed Database with Sample Questions

```bash
npm run seed
```

## 🚀 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on http://localhost:5000

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `DELETE /api/users/me` - Delete account
- `GET /api/users/stats` - Get user statistics

### Interviews
- `POST /api/interviews` - Create new interview
- `GET /api/interviews` - Get all user interviews (paginated)
- `GET /api/interviews/:id` - Get single interview
- `PUT /api/interviews/:id` - Update interview
- `DELETE /api/interviews/:id` - Delete interview
- `POST /api/interviews/:id/start` - Start interview
- `POST /api/interviews/:id/complete` - Complete interview

### Questions
- `GET /api/questions` - Get all questions (filtered)
- `GET /api/questions/:id` - Get single question
- `GET /api/questions/random/:role` - Get random questions for role

### Analytics
- `GET /api/analytics/dashboard` - Get user dashboard data
- `GET /api/analytics/performance` - Get performance over time
- `GET /api/analytics/leaderboard` - Get global leaderboard

## 🔌 WebSocket Namespaces

### `/interview` - Interview Session Management
- `join-interview` - Join interview room
- `submit-answer` - Submit answer and get next question
- `pause-interview` - Pause interview
- `resume-interview` - Resume interview

### `/feedback` - Real-time Feedback Generation
- `generate-feedback` - Start feedback generation
- `feedback-progress` - Receive progress updates (0-100%)
- `feedback-complete` - Receive final feedback

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── auth.controller.js   # Authentication logic
│   ├── user.controller.js   # User operations
│   ├── interview.controller.js
│   ├── question.controller.js
│   └── analytics.controller.js
├── middleware/
│   ├── auth.middleware.js   # JWT verification
│   ├── error.middleware.js  # Error handling
│   └── validate.middleware.js
├── models/
│   ├── User.model.js        # User schema
│   ├── Interview.model.js   # Interview schema
│   ├── Question.model.js    # Question schema
│   └── Feedback.model.js    # Feedback schema
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── interview.routes.js
│   ├── question.routes.js
│   └── analytics.routes.js
├── sockets/
│   ├── interview.socket.js  # Interview WebSocket logic
│   └── feedback.socket.js   # Feedback WebSocket logic
├── utils/
│   └── generateToken.js     # JWT token generation
├── .env.example
├── .gitignore
├── package.json
└── server.js                # Main entry point
```

## 🌐 Deployment (Free Tier)

### Option 1: Railway (Recommended)

1. Push code to GitHub
2. Go to [Railway.app](https://railway.app/)
3. Connect GitHub repository
4. Add environment variables
5. Deploy automatically

### Option 2: Render

1. Push code to GitHub
2. Go to [Render.com](https://render.com/)
3. Create new "Web Service"
4. Connect repository
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables
8. Deploy

## 🔧 Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
AI_SERVICE_URL=https://your-ai-service-url.com
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Check IP whitelist in MongoDB Atlas
- Verify connection string format
- Ensure username/password don't contain special characters (URL encode if needed)

### WebSocket Connection Fails
- Check CORS settings in `server.js`
- Verify frontend URL matches FRONTEND_URL env variable
- Ensure Socket.IO client version matches server version

### AI Service Timeout
- AI service might be sleeping (free tier)
- Increase timeout in `sockets/feedback.socket.js`
- Implement retry logic

## 📊 Monitoring

Check server health:
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-13T...",
  "database": "connected"
}
```

## 🔐 Security Notes

- JWT tokens expire after 7 days (configurable)
- Passwords hashed with bcrypt (10 rounds)
- Rate limiting enabled (100 requests per 15 minutes)
- Helmet middleware for security headers
- CORS restricted to frontend URL
- Request size limited to 10MB

## 📝 License

MIT

## 👥 Authors

CogniPrep Team
