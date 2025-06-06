import { useState } from 'react';
import { Leaf, FlaskConical, Sprout } from 'lucide-react';
import { getCropRecommendations } from '../services/getCropRecommendations';

interface SoilData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  phLevel: string;
  rainfall: string;
  temperature: string;
  humidity: string;
}

interface CropRecommendation {
  crop: string;
  probability: number;
  description: string;
}

function CropManagement() {
  const [soilData, setSoilData] = useState<SoilData>({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    phLevel: '',
    rainfall: '',
    temperature: '',
    humidity: ''
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSoilData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
  
      if (!soilData.nitrogen || !soilData.phosphorus || !soilData.potassium || 
          !soilData.phLevel || !soilData.rainfall || !soilData.temperature || !soilData.humidity) {
        throw new Error('Please fill all soil parameters');
      }

        const soilParams = {
        nitrogen: parseFloat(soilData.nitrogen),
        phosphorus: parseFloat(soilData.phosphorus),
        potassium: parseFloat(soilData.potassium),
        phLevel: parseFloat(soilData.phLevel),
        rainfall: parseFloat(soilData.rainfall),
        temperature: parseFloat(soilData.temperature),
        humidity: parseFloat(soilData.humidity)
      };

 
      const apiRecommendations = await getCropRecommendations(soilParams);
      setRecommendations(apiRecommendations);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get recommendations');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Crop Recommendation System</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FlaskConical className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Soil Analysis</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-1">
                  Nitrogen Level (kg/ha)
                </label>
                <input
                  type="number"
                  id="nitrogen"
                  name="nitrogen"
                  value={soilData.nitrogen}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 25"
                />
              </div>
              <div>
                <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-1">
                  Phosphorus Level (kg/ha)
                </label>
                <input
                  type="number"
                  id="phosphorus"
                  name="phosphorus"
                  value={soilData.phosphorus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 15"
                />
              </div>
              <div>
                <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">
                  Potassium Level (kg/ha)
                </label>
                <input
                  type="number"
                  id="potassium"
                  name="potassium"
                  value={soilData.potassium}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 20"
                />
              </div>
              <div>
                <label htmlFor="phLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Soil pH Level
                </label>
                <input
                  type="number"
                  id="phLevel"
                  name="phLevel"
                  value={soilData.phLevel}
                  onChange={handleInputChange}
                  min="0"
                  max="14"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 6.5"
                />
              </div>
              <div>
                <label htmlFor="rainfall" className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Rainfall (mm)
                </label>
                <input
                  type="number"
                  id="rainfall"
                  name="rainfall"
                  value={soilData.rainfall}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 800"
                />
              </div>
              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  id="temperature"
                  name="temperature"
                  value={soilData.temperature}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 25"
                />
              </div>
              <div>
                <label htmlFor="humidity" className="block text-sm font-medium text-gray-700 mb-1">
                  Humidity (%)
                </label>
                <input
                  type="number"
                  id="humidity"
                  name="humidity"
                  value={soilData.humidity}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 65"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Analyzing Soil...' : 'Get Crop Recommendations'}
            </button>
            
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Sprout className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Recommended Crops</h2>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : recommendations.length > 0 ? (
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{rec.crop}</h3>
                      <p className="text-gray-600 mt-1">{rec.description}</p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {rec.probability}% match
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${rec.probability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Enter your soil data to get crop recommendations.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropManagement;