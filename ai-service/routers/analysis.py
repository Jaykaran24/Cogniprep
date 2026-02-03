from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

from models.model_loader import get_sentence_model

router = APIRouter()

class AnalysisRequest(BaseModel):
    question: str
    answer: str
    expectedKeywords: Optional[List[str]] = []

class AnalysisResponse(BaseModel):
    scores: dict
    feedback: dict
    similarity: float

@router.post("/analyze-answer", response_model=AnalysisResponse)
async def analyze_answer(request: AnalysisRequest):
    """
    Analyze interview answer quality using semantic similarity and keyword matching
    """
    try:
        # Load sentence transformer model
        model = get_sentence_model()
        
        # Calculate semantic similarity
        embeddings = model.encode([request.question, request.answer])
        similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
        similarity_score = float(similarity)
        
        # Analyze answer length
        word_count = len(request.answer.split())
        length_score = min(10, (word_count / 20) * 10)  # Ideal: 20+ words
        
        # Keyword matching
        answer_lower = request.answer.lower()
        keyword_matches = sum(1 for kw in request.expectedKeywords if kw.lower() in answer_lower)
        keyword_score = min(10, (keyword_matches / max(len(request.expectedKeywords), 1)) * 10) if request.expectedKeywords else 7
        
        # Calculate scores
        relevance = min(10, similarity_score * 10)
        completeness = min(10, (length_score + keyword_score) / 2)
        technical_accuracy = keyword_score
        communication = length_score
        overall = (relevance + completeness + technical_accuracy + communication) / 4
        
        # Generate feedback
        strengths = []
        improvements = []
        tips = []
        
        if relevance >= 7:
            strengths.append("Answer is relevant to the question")
        else:
            improvements.append("Try to stay more focused on the question asked")
        
        if word_count >= 20:
            strengths.append("Provided detailed explanation")
        else:
            improvements.append("Provide more detailed explanations")
            tips.append("Aim for at least 20-30 words in your answer")
        
        if keyword_matches > 0:
            strengths.append(f"Mentioned {keyword_matches} key concept(s)")
        else:
            improvements.append("Include more technical keywords")
            tips.append("Review the core concepts related to this question")
        
        if not strengths:
            strengths.append("Answer submitted")
        
        if not improvements:
            improvements.append("Continue practicing")
        
        if not tips:
            tips.append("Keep up the good work!")
        
        return AnalysisResponse(
            scores={
                "relevance": round(relevance, 1),
                "completeness": round(completeness, 1),
                "technicalAccuracy": round(technical_accuracy, 1),
                "communication": round(communication, 1),
                "overall": round(overall, 1)
            },
            feedback={
                "strengths": strengths[:3],  # Top 3
                "improvements": improvements[:3],  # Top 3
                "tips": tips[:2]  # Top 2
            },
            similarity=round(similarity_score, 3)
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/sentiment")
async def analyze_sentiment(text: str):
    """
    Analyze sentiment of text (basic implementation)
    """
    try:
        # Simple sentiment analysis based on word patterns
        positive_words = ['good', 'great', 'excellent', 'confident', 'yes', 'definitely', 'sure', 'absolutely']
        negative_words = ['bad', 'poor', 'difficult', 'unsure', 'maybe', 'don\'t know', 'confused']
        
        text_lower = text.lower()
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        if positive_count > negative_count:
            sentiment = "positive"
            confidence = min(0.9, 0.5 + (positive_count * 0.1))
        elif negative_count > positive_count:
            sentiment = "negative"
            confidence = min(0.9, 0.5 + (negative_count * 0.1))
        else:
            sentiment = "neutral"
            confidence = 0.6
        
        return {
            "sentiment": sentiment,
            "confidence": round(confidence, 2),
            "positive_indicators": positive_count,
            "negative_indicators": negative_count
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sentiment analysis failed: {str(e)}")

@router.post("/similarity")
async def calculate_similarity(text1: str, text2: str):
    """
    Calculate semantic similarity between two texts
    """
    try:
        model = get_sentence_model()
        embeddings = model.encode([text1, text2])
        similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
        
        return {
            "similarity": round(float(similarity), 3),
            "percentage": round(float(similarity) * 100, 1)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Similarity calculation failed: {str(e)}")
