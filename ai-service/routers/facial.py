from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import cv2
import numpy as np
from PIL import Image
import io
import random

router = APIRouter()

class FacialWarning(BaseModel):
    type: str
    message: str
    severity: str

class FacialAnalysisResponse(BaseModel):
    warnings: List[FacialWarning]
    confidence: float
    detected_features: dict

@router.post("/analyze-facial-expression", response_model=FacialAnalysisResponse)
async def analyze_facial_expression(frame: UploadFile = File(...)):
    """
    Analyze facial expressions and body language from video frame
    """
    try:
        # Read image
        contents = await frame.read()
        image = Image.open(io.BytesIO(contents))
        img_array = np.array(image)
        
        # Convert RGB to BGR for OpenCV
        img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
        
        # Load OpenCV face cascade
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
        
        # Convert to grayscale for detection
        gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        warnings = []
        detected_features = {
            'faces_detected': len(faces),
            'eyes_detected': 0,
            'face_position': None
        }
        
        if len(faces) == 0:
            warnings.append(FacialWarning(
                type='face-not-detected',
                message='Please position yourself in front of the camera',
                severity='warning'
            ))
        else:
            # Analyze first detected face
            (x, y, w, h) = faces[0]
            
            # Calculate face position (centered or not)
            img_height, img_width = gray.shape
            face_center_x = x + w // 2
            face_center_y = y + h // 2
            img_center_x = img_width // 2
            img_center_y = img_height // 2
            
            detected_features['face_position'] = {
                'x': int(face_center_x),
                'y': int(face_center_y),
                'width': int(w),
                'height': int(h)
            }
            
            # Check if face is too far from center
            if abs(face_center_x - img_center_x) > img_width * 0.2:
                warnings.append(FacialWarning(
                    type='face-position',
                    message='Try to center yourself in the frame',
                    severity='info'
                ))
            
            # Check if face is too small (too far from camera)
            if w < img_width * 0.2:
                warnings.append(FacialWarning(
                    type='distance',
                    message='Move closer to the camera for better analysis',
                    severity='info'
                ))
            elif w > img_width * 0.6:
                warnings.append(FacialWarning(
                    type='distance',
                    message='Move slightly back from the camera',
                    severity='info'
                ))
            
            # Detect eyes in face region
            roi_gray = gray[y:y+h, x:x+w]
            eyes = eye_cascade.detectMultiScale(roi_gray, 1.1, 5)
            detected_features['eyes_detected'] = len(eyes)
            
            if len(eyes) < 2:
                warnings.append(FacialWarning(
                    type='eye-contact',
                    message='Look directly at the camera for better engagement',
                    severity='info'
                ))
            
            # Check brightness
            brightness = np.mean(gray)
            if brightness < 60:
                warnings.append(FacialWarning(
                    type='lighting',
                    message='Lighting is too dim. Consider adding more light',
                    severity='warning'
                ))
            elif brightness > 200:
                warnings.append(FacialWarning(
                    type='lighting',
                    message='Lighting is too bright. Reduce harsh lighting',
                    severity='info'
                ))
            
            # Posture check (simulated based on face height position)
            if face_center_y > img_center_y + img_height * 0.15:
                warnings.append(FacialWarning(
                    type='posture',
                    message='Sit up straight - your posture appears slouched',
                    severity='warning'
                ))
        
        # If no warnings, add positive feedback occasionally
        if len(warnings) == 0 and random.random() > 0.7:
            warnings.append(FacialWarning(
                type='positive',
                message='Great! Your positioning and posture look excellent',
                severity='success'
            ))
        
        confidence = min(len(faces) * 0.5 + detected_features['eyes_detected'] * 0.2, 1.0)
        
        return FacialAnalysisResponse(
            warnings=warnings,
            confidence=confidence,
            detected_features=detected_features
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing facial expression: {str(e)}")


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "facial-analysis"}
