from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
import tempfile
import os
import librosa
import soundfile as sf

from models.model_loader import get_whisper_model

router = APIRouter()

class TranscriptionResponse(BaseModel):
    text: str
    confidence: float
    duration: float
    segments: list

@router.post("/transcribe", response_model=TranscriptionResponse)
async def transcribe_audio(audio: UploadFile = File(...)):
    """
    Transcribe audio file to text using Whisper
    Accepts: WAV, MP3, M4A, FLAC
    """
    try:
        # Validate file type
        allowed_types = ['audio/wav', 'audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/flac']
        if audio.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail=f"Invalid audio format. Allowed: {allowed_types}")
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_file:
            content = await audio.read()
            tmp_file.write(content)
            tmp_path = tmp_file.name
        
        try:
            # Load Whisper model
            model = get_whisper_model()
            
            # Transcribe
            result = model.transcribe(
                tmp_path,
                fp16=False,  # Disable FP16 for CPU
                language='en',  # Force English for faster processing
                task='transcribe'
            )
            
            # Get audio duration
            audio_data, sr = librosa.load(tmp_path, sr=None)
            duration = librosa.get_duration(y=audio_data, sr=sr)
            
            # Calculate average confidence from segments
            segments = result.get('segments', [])
            avg_confidence = sum(seg.get('no_speech_prob', 0) for seg in segments) / len(segments) if segments else 0.5
            confidence = 1.0 - avg_confidence  # Invert no_speech_prob
            
            return TranscriptionResponse(
                text=result['text'].strip(),
                confidence=round(confidence, 2),
                duration=round(duration, 2),
                segments=[
                    {
                        'text': seg['text'].strip(),
                        'start': seg['start'],
                        'end': seg['end']
                    }
                    for seg in segments
                ]
            )
        
        finally:
            # Clean up temporary file
            os.unlink(tmp_path)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

@router.post("/transcribe-stream")
async def transcribe_stream(audio_chunk: bytes):
    """
    Real-time transcription for audio chunks (future implementation)
    """
    return {
        "message": "Streaming transcription not yet implemented",
        "status": "coming_soon"
    }
