import google.generativeai as genai
import json
import traceback
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

async def detect_disease_from_image(image_base64: str, mime_type: str = "image/jpeg"):
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')

        prompt = """
        Analyze this crop/soil image and identify any diseases or deficiencies.
        Provide detailed information about the condition and suggest possible treatments.

        Format strictly as JSON:
        [
          {
            "disease": "xyz",
            "symptoms": "abc",
            "precautions": "def",
            "description": "detailed explanation"
          }
        ]
        """

        response = model.generate_content([
            {
                "role": "user",
                "parts": [{"text": prompt}]
            },
            {
                "role": "user",
                "parts": [{
                    "inline_data": {
                        "mime_type": mime_type,
                        "data": image_base64
                    }
                }]
            }
        ])

        raw_text = response.text
        print("Gemini raw response:", raw_text)

        cleaned = raw_text.strip().removeprefix("```json").removesuffix("```").strip()
        result = json.loads(cleaned)
        return result

    except json.JSONDecodeError as e:
        print("JSON parse error:", e)
        return [{"description": "Unable to parse Gemini output. Please try again."}]
    except Exception as e:
        print("Gemini Error:", e)
        traceback.print_exc()
        return [{"description": "Error analyzing image. Please try again later."}]


async def get_crop_recommendations(soil_params: dict):
    """
    soil_params dict keys:
    - nitrogen
    - phosphorus
    - potassium
    - phLevel
    - rainfall
    - temperature
    - humidity
    """
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')

        prompt = f"""
Analyze these soil and climate parameters and recommend suitable crops:
- Nitrogen: {soil_params['nitrogen']} kg/ha
- Phosphorus: {soil_params['phosphorus']} kg/ha
- Potassium: {soil_params['potassium']} kg/ha
- pH Level: {soil_params['phLevel']}
- Rainfall: {soil_params['rainfall']} mm/year
- Temperature: {soil_params['temperature']}°C
- Humidity: {soil_params['humidity']}%

Provide exactly 4 crop recommendations in JSON format as an array of objects with these properties:
- crop: string (crop name)
- probability: number (suitability percentage 0-100)
- description: string (brief explanation of why it's suitable)

Format your response to be directly parseable as JSON. Only return the JSON array, no additional text or markdown.
"""

        response = model.generate_content([
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ])

        raw_text = response.text
        print("Gemini raw response:", raw_text)
        json_start = raw_text.find('[')
        json_end = raw_text.rfind(']') + 1
        json_str = raw_text[json_start:json_end]

        recommendations = json.loads(json_str)

        if not isinstance(recommendations, list):
            raise ValueError("API response is not a list")

        return recommendations

    except Exception as e:
        print("Error in crop recommendation:", e)
        traceback.print_exc()
        return []



async def get_chatbot_response(question: str):
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')

        prompt = f"""
You are AgriBot, a helpful assistant for farmers. Please provide accurate, 
professional advice on agricultural topics. Respond to this farming/agriculture query:

"{question}"

Your response should be:
1. Informative and practical
2. Based on scientific agricultural knowledge
3. Clear and easy to understand
4. Concise (keep response under 200 words unless complex explanation is required)
"""

        response = model.generate_content([
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ])

        return response.text.strip()

    except Exception as e:
        print("Error generating chatbot response:", e)
        import traceback
        traceback.print_exc()
        raise Exception("Chatbot generation failed")
