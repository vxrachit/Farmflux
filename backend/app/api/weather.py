from fastapi import APIRouter, Query
from app.models.weather import WeatherResponse
from app.services.weather_services import fetch_weather

router = APIRouter()
@router.get("/weather", response_model=WeatherResponse)
async def get_weather(
    latitude: float = Query(..., description="Latitude of the location"),
    longitude: float = Query(..., description="Longitude of the location")
):
    return await fetch_weather(latitude, longitude)