import axios from 'axios';
import { Weather } from '../types';

// Remove direct API_KEY usage here — backend handles API key securely

export const getWeatherData = async (latitude: number, longitude: number): Promise<Weather> => {
  try {
    // Call your backend API, passing latitude and longitude as query params
    const response = await axios.get('http://localhost:8000/api/weather', {
      params: { latitude, longitude }
    });
    return response.data;  // assuming backend returns JSON matching Weather type
  } catch (error) {
    console.error('Error fetching weather data from backend:', error);
    throw error;
  }
};
