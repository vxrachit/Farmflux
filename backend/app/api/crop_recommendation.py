from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models.crop_recommendation import SoilParams 
from app.services.gemini_service import  get_crop_recommendations


router = APIRouter()


@router.post("/crop-recommendations")
async def crop_recommendations(params: SoilParams):
    recommendations = await get_crop_recommendations(params.dict())
    if not recommendations:
        raise HTTPException(status_code=500, detail="Failed to get crop recommendations")
    return {"recommendations": recommendations}
