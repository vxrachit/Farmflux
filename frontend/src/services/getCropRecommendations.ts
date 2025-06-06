interface SoilParameters {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  phLevel: number;
  rainfall: number;
  temperature: number;
  humidity: number;
}

export interface CropRecommendation {
  crop: string;
  probability: number;
  description: string;
}

export const getCropRecommendations = async (
  soilParams: SoilParameters
): Promise<CropRecommendation[]> => {
  const response = await fetch('https://farmflux.onrender.com/api/crop-recommendations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(soilParams),
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.recommendations;
};
