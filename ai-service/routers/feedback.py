from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import torch

from models.model_loader import get_llm_model

router = APIRouter()

class FeedbackRequest(BaseModel):
    question: str
    answer: str
    score: float

class FeedbackResponse(BaseModel):
    summary: str
    suggestions: List[str]

class SummaryRequest(BaseModel):
    questions: List[dict]
    overallPerformance: dict

class SummaryResponse(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    recommendations: List[str]
    overallFeedback: str

@router.post("/generate", response_model=FeedbackResponse)
async def generate_feedback(request: FeedbackRequest):
    """
    Generate feedback for a single question using LLM
    Note: This is CPU-based so it's slower. For production, consider caching common patterns.
    """
    try:
        model, tokenizer = get_llm_model()
        
        # Create prompt for feedback generation
        prompt = f"""Analyze this interview answer and provide constructive feedback.
Question: {request.question}
Answer: {request.answer}
Score: {request.score}/10

Provide brief, actionable feedback in 2-3 sentences."""
        
        # Tokenize and generate
        inputs = tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
        
        with torch.no_grad():
            outputs = model.generate(
                inputs.input_ids,
                max_length=150,
                num_beams=2,  # Reduce beams for faster CPU generation
                early_stopping=True,
                temperature=0.7
            )
        
        feedback_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Generate suggestions based on score
        suggestions = []
        if request.score < 5:
            suggestions.append("Review the fundamental concepts related to this topic")
            suggestions.append("Practice explaining your thoughts more clearly")
        elif request.score < 7:
            suggestions.append("Good foundation, try to provide more specific examples")
            suggestions.append("Explain the 'why' behind your answers")
        else:
            suggestions.append("Excellent answer! Continue practicing edge cases")
            suggestions.append("Try to relate concepts to real-world applications")
        
        return FeedbackResponse(
            summary=feedback_text,
            suggestions=suggestions
        )
    
    except Exception as e:
        # Fallback to simple feedback if LLM fails
        print(f"LLM feedback generation failed: {e}")
        return FeedbackResponse(
            summary=f"Your answer scored {request.score}/10. Keep practicing to improve!",
            suggestions=[
                "Review the key concepts for this topic",
                "Practice explaining your answers clearly",
                "Provide specific examples when possible"
            ]
        )

@router.post("/generate-summary", response_model=SummaryResponse)
async def generate_summary(request: SummaryRequest):
    """
    Generate overall interview summary
    """
    try:
        # Calculate statistics
        total_questions = len(request.questions)
        answered_questions = sum(1 for q in request.questions if q.get('response', {}).get('text'))
        avg_score = sum(q.get('score', {}).get('overall', 0) for q in request.questions) / max(total_questions, 1)
        
        # Generate strengths
        strengths = []
        if avg_score >= 7:
            strengths.append("Strong overall performance across multiple questions")
        if answered_questions == total_questions:
            strengths.append("Completed all interview questions")
        strengths.append(f"Answered {answered_questions}/{total_questions} questions")
        
        # Generate weaknesses
        weaknesses = []
        low_score_count = sum(1 for q in request.questions if q.get('score', {}).get('overall', 0) < 5)
        if low_score_count > 0:
            weaknesses.append(f"Struggled with {low_score_count} question(s)")
        if avg_score < 5:
            weaknesses.append("Need to strengthen fundamental concepts")
        elif avg_score < 7:
            weaknesses.append("Room for improvement in providing detailed answers")
        
        if not weaknesses:
            weaknesses.append("Minor areas for improvement in edge cases")
        
        # Generate recommendations
        recommendations = []
        if avg_score < 5:
            recommendations.append("Focus on building strong fundamentals")
            recommendations.append("Practice with easier questions first")
        elif avg_score < 7:
            recommendations.append("Practice explaining concepts in more detail")
            recommendations.append("Work on providing specific examples")
        else:
            recommendations.append("Continue practicing complex scenarios")
            recommendations.append("Explore advanced topics in your field")
        
        recommendations.append("Review your weak areas identified in the feedback")
        
        # Overall feedback
        if avg_score >= 8:
            overall = f"Excellent performance! You scored an average of {avg_score:.1f}/10. Keep up the great work and continue refining your skills."
        elif avg_score >= 6:
            overall = f"Good performance! You scored an average of {avg_score:.1f}/10. With some practice on the identified areas, you'll be interview-ready."
        elif avg_score >= 4:
            overall = f"Fair performance with an average score of {avg_score:.1f}/10. Focus on the recommendations provided to improve significantly."
        else:
            overall = f"You scored an average of {avg_score:.1f}/10. Don't be discouraged! Review the fundamentals and practice regularly to improve."
        
        return SummaryResponse(
            strengths=strengths[:3],
            weaknesses=weaknesses[:3],
            recommendations=recommendations[:3],
            overallFeedback=overall
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summary generation failed: {str(e)}")
