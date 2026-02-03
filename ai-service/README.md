# CogniPrep AI Service

CPU-optimized AI service for interview analysis using lightweight open-source models.

## 🤖 Models Used (All Free & CPU-Optimized)

- **Whisper-tiny** (39M params) - Speech-to-text transcription
- **all-MiniLM-L6-v2** (80MB) - Semantic similarity analysis
- **Flan-T5-base** (220M params) - Feedback generation

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd ai-service
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Set Up Environment

```bash
copy .env.example .env
```

Edit `.env`:
```env
ENV=development
HOST=0.0.0.0
PORT=8000
WHISPER_MODEL=tiny
SENTENCE_MODEL=all-MiniLM-L6-v2
LLM_MODEL=google/flan-t5-base
MODEL_CACHE_DIR=./models
```

### 3. Run the Service

```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The service will start on http://localhost:8000

📚 **API Documentation**: http://localhost:8000/docs

## 📡 API Endpoints

### Health Check
- `GET /health` - Check service status and loaded models

### Transcription
- `POST /transcription/transcribe` - Convert audio to text
  - Accepts: WAV, MP3, M4A, FLAC
  - Returns: Transcribed text, confidence score, segments

### Analysis
- `POST /analysis/analyze-answer` - Analyze answer quality
  - Input: Question, answer, expected keywords
  - Returns: Scores, feedback, similarity

- `POST /analysis/sentiment` - Analyze text sentiment
- `POST /analysis/similarity` - Calculate semantic similarity

### Feedback
- `POST /feedback/generate` - Generate feedback for single question
- `POST /feedback/generate-summary` - Generate overall interview summary

## 📊 Performance (CPU-only)

| Operation | Time (Approx) | Hardware |
|-----------|---------------|----------|
| Audio transcription (30s) | 2-5 seconds | Modern CPU (i5/i7) |
| Answer analysis | 0.5-1 second | Modern CPU |
| Feedback generation | 3-10 seconds | Modern CPU |
| Full interview (10 questions) | 30-60 seconds | Modern CPU |

## 🌐 Deployment Options (Free Tier)

### Option 1: Hugging Face Spaces (Recommended)

1. Create account at [huggingface.co](https://huggingface.co)
2. Create new Space (SDK: Docker)
3. Create `Dockerfile`:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download models
RUN python -c "import whisper; whisper.load_model('tiny')"
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

COPY . .

EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
```

4. Push code and it auto-deploys
5. **Benefits**: Free forever, 2 CPU cores, 16GB RAM, no sleep timeout

### Option 2: Render Free Tier

1. Push code to GitHub
2. Create new "Web Service" on [Render.com](https://render.com)
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Limitation**: Sleeps after 15 min inactivity

### Option 3: Railway Free Tier

1. Push to GitHub
2. Connect on [Railway.app](https://railway.app)
3. Configure start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Benefit**: $5 credit/month (usually enough for hobby projects)

## 🧪 Testing

### Test Health
```bash
curl http://localhost:8000/health
```

### Test Transcription
```bash
curl -X POST "http://localhost:8000/transcription/transcribe" \
  -F "audio=@sample.wav"
```

### Test Analysis
```bash
curl -X POST "http://localhost:8000/analysis/analyze-answer" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is React?",
    "answer": "React is a JavaScript library for building user interfaces",
    "expectedKeywords": ["javascript", "library", "ui"]
  }'
```

## 🔧 Optimization Tips

### 1. Model Size Selection

**Whisper**:
- `tiny` (39M) - Fast, good for real-time, 90% accuracy
- `base` (74M) - Balanced, 95% accuracy
- `small` (244M) - Slower, 97% accuracy

### 2. Reduce Inference Time

- Use `fp16=False` for CPU
- Reduce `num_beams` in LLM generation
- Cache frequent queries
- Pre-compute embeddings for questions

### 3. Memory Management

- Models load on first request (10-30 seconds)
- After loaded, kept in memory
- Use `MODEL_CACHE_DIR` to persist downloads

## 📁 Project Structure

```
ai-service/
├── models/
│   ├── __init__.py
│   └── model_loader.py       # Model loading and caching
├── routers/
│   ├── __init__.py
│   ├── transcription.py      # Speech-to-text endpoints
│   ├── analysis.py           # Answer analysis endpoints
│   └── feedback.py           # Feedback generation endpoints
├── .env.example
├── .gitignore
├── main.py                   # FastAPI application
├── requirements.txt
└── README.md
```

## 🐛 Troubleshooting

### Models not downloading
```bash
# Manually download models
python -c "import whisper; whisper.load_model('tiny')"
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"
python -c "from transformers import AutoTokenizer, AutoModelForSeq2SeqLM; AutoTokenizer.from_pretrained('google/flan-t5-base'); AutoModelForSeq2SeqLM.from_pretrained('google/flan-t5-base')"
```

### Out of memory
- Use smaller Whisper model (`tiny` instead of `base`)
- Reduce `max_length` in LLM generation
- Process one request at a time (default FastAPI behavior)

### Slow transcription
- Whisper-tiny is optimized for speed
- Consider using external API for production (AssemblyAI free tier)

## 🔐 Security Notes

- CORS configured for all origins (change in production)
- No authentication required (add if needed)
- File size limits: 10MB for audio uploads

## 📝 License

MIT
