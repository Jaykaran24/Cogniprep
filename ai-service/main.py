from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from routers import transcription, analysis, feedback, facial

app = FastAPI(
    title="CogniPrep AI Service",
    version="1.0.0",
    description="AI-powered interview analysis with CPU-optimized models"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to preload models (optional - speeds up first request)
@app.on_event("startup")
async def startup_event():
    """Preload AI models on startup"""
    from models.model_loader import ModelLoader
    
    loader = ModelLoader()
    print("\n🚀 Preloading AI models...")
    
    try:
        loader.load_whisper_model()
        loader.load_sentence_model()
        loader.load_llm_model()
        print("✅ All models preloaded successfully!\n")
    except Exception as e:
        print(f"⚠️ Model preloading failed: {e}")
        print("Models will load on first use instead.\n")

# Include routers
app.include_router(transcription.router, prefix="/transcription", tags=["Speech-to-Text"])
app.include_router(analysis.router, prefix="/analysis", tags=["Analysis"])
app.include_router(feedback.router, prefix="/feedback", tags=["Feedback"])
app.include_router(facial.router, tags=["Facial Analysis"])

# Health check endpoint
@app.get("/health")
async def health_check():
    """Check if the service is healthy and models are loaded"""
    from models.model_loader import ModelLoader
    
    loader = ModelLoader()
    
    return {
        "status": "healthy",
        "models": {
            "whisper": loader.whisper_loaded,
            "sentence_transformer": loader.sentence_model_loaded,
            "llm": loader.llm_loaded
        },
        "environment": os.getenv("ENV", "development")
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "CogniPrep AI Service",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=os.getenv("ENV") == "development"
    )
