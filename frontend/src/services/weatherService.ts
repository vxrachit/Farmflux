import axios from 'axios';
import { Weather } from '../types';

export const getWeatherData = async (latitude: number, longitude: number): Promise<Weather> => {
  try {
    // Call your backend API, passing latitude and longitude as query params
    const response = await axios.get('https://farmflux.onrender.com/api/weather', {
      params: { latitude, longitude }
    });
    return response.data;  // assuming backend returns JSON matching Weather type
  } catch (error) {
    console.error('Error fetching weather data from backend:', error);
    throw error;
  }
};
