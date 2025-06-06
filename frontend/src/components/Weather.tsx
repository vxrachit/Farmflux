import React, { useEffect, useState } from 'react';
import { Cloud, Droplets, Wind } from 'lucide-react';
import { getWeatherData } from '../services/weatherService';
import { Weather as WeatherType } from '../types';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

function Weather() {
  const { language } = useLanguage();
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const data = await getWeatherData(
              position.coords.latitude,
              position.coords.longitude
            );
            setWeather(data);
            setLoading(false);
          });
        } else {
          toast.error(getTranslation(language, 'geolocationNotSupported'));
          setLoading(false);
        }
      } catch (error) {
        toast.error(getTranslation(language, 'errorFetchingWeather'));
        setLoading(false);
      }
    };

    fetchWeather();
  }, [language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center text-gray-600">
        {getTranslation(language, 'failedToFetchWeather')}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">{getTranslation(language, 'weatherForecast')}</h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{weather.city}</h2>
            <p className="text-gray-600 capitalize">{weather.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WeatherCard
            icon={<Cloud className="h-8 w-8 text-blue-500" />}
            title={getTranslation(language, 'temperature')}
            value={`${weather.temperature}°C`}
          />

          <WeatherCard
            icon={<Droplets className="h-8 w-8 text-blue-500" />}
            title={getTranslation(language, 'humidity')}
            value={`${weather.humidity}%`}
          />

          <WeatherCard
            icon={<Wind className="h-8 w-8 text-blue-500" />}
            title={getTranslation(language, 'windSpeed')}
            value={`${weather.wind_speed} km/h`}
          />
        </div>
      </div>
    </div>
  );
}

function WeatherCard({
  icon,
  title,
  value
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-2xl font-bold text-green-600">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
