import os
import httpx
from dotenv import load_dotenv
from fastapi import HTTPException
from app.models.weather import WeatherResponse

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

async def fetch_weather(latitude: float, longitude: float) -> WeatherResponse:
    if not WEATHER_API_KEY:
        raise HTTPException(status_code=500, detail="Weather API key not configured.")

    url = (
        f"https://api.weatherapi.com/v1/current.json"
        f"?key={WEATHER_API_KEY}&q={latitude},{longitude}&aqi=no"
    )

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            data = response.json()

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=data.get("error", {}).get("message", "Weather data not found"))

        return WeatherResponse(
            city=data["location"]["name"],
            temperature=data["current"]["temp_c"],
            description=data["current"]["condition"]["text"],
            humidity=data["current"]["humidity"],
            wind_speed=data["current"]["wind_kph"]
        )

    except Exception as e:
        print("Weather API Error:", e)
        raise HTTPException(status_code=500, detail="Internal error fetching weather data.")
