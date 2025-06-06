from pydantic import BaseModel

class DiseaseDetectionRequest(BaseModel):
    image_base64: str

class DiseaseInfo(BaseModel):
    disease: str = ""
    symptoms: str = ""
    precautions: str = ""
    description: str
