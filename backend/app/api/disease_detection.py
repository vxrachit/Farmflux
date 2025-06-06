from fastapi import APIRouter, HTTPException
from app.models.disease_detection import DiseaseDetectionRequest, DiseaseInfo
from app.services.gemini_service import detect_disease_from_image

router = APIRouter()

@router.post("/detect-disease", response_model=list[DiseaseInfo])
async def detect_disease(data: DiseaseDetectionRequest):
    try:
        result = await detect_disease_from_image(data.image_base64)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
