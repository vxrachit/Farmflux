from fastapi import FastAPI
from app.api import disease_detection
from app.api import crop_recommendation 
from app.api import chatbot
from app.api import weather
from app.api import supabase as supabase_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Farm Flux API",docs_url=None,redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://farmflux.pages.dev",
        "https://farmflux.vxrachit.dpdns.org"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(disease_detection.router, prefix="/api", tags=["Disease Detection"])
app.include_router(crop_recommendation.router, prefix="/api", tags=["Crop Recommendation"])
app.include_router(chatbot.router, prefix="/api", tags=["Agrobot"])
app.include_router(weather.router, prefix="/api",
tags=["Weather"])
app.include_router(supabase_routes.router, prefix="/api",
tags=["Authentication"])


