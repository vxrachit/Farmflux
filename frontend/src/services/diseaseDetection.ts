// src/services/diseaseDetection.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const detectDisease = async (imageBase64: string): Promise<any[]> => {
  try {
    // Determine MIME type from base64 prefix
    const mimeType = imageBase64.startsWith('data:image/png')
      ? 'image/png'
      : 'image/jpeg';

    const response = await fetch(`${BASE_URL}/api/detect-disease`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_base64: imageBase64.split(',')[1], // remove data:image/jpeg;base64,
        mime_type: mimeType,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data; // Not `data.result` since your FastAPI route directly returns the list
  } catch (error) {
    console.error('Frontend Error detecting disease:', error);
    throw error;
  }
};
