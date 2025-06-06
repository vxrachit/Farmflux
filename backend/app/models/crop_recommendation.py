from pydantic import BaseModel

class SoilParams(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    phLevel: float
    rainfall: float
    temperature: float
    humidity: float