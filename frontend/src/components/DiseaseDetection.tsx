import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { detectDisease } from '../services/diseaseDetection';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

function DiseaseDetection() {
  const { language } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const result = await detectDisease(image);
      setAnalysis(result);
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error('Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">
        {getTranslation(language, 'diseaseDetection')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              {getTranslation(language, 'uploadImage')}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-gray-600">{getTranslation(language, 'clickToUpload')}</span>
                <span className="text-sm text-gray-500">{getTranslation(language, 'imageFormats')}</span>
              </label>
            </div>
          </div>

          {image && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <img
                src={image}
                alt="Uploaded crop"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400"
              >
                {loading
                  ? getTranslation(language, 'analyzing')
                  : getTranslation(language, 'analyze')}
              </button>
            </div>
          )}
        </div>

           {analysis && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                {getTranslation(language, 'analysisResults')}
              </h2>
            </div>

            <div className="space-y-6">
              {analysis.map((item, index) => (
                <div key={index} className="space-y-4">
                  {item.disease && (
                    <div className="flex justify-between">
                      <strong className="text-gray-800 text-lg">Disease:</strong>
                      <p className="text-gray-600">{item.disease}</p>
                    </div>
                  )}

                  {item.symptoms && (
                    <div className="flex justify-between">
                      <strong className="text-gray-800 text-lg">Symptoms:</strong>
                      <p className="text-gray-600">{item.symptoms}</p>
                    </div>
                  )}

                  {item.precautions && (
                    <div className="flex justify-between">
                      <strong className="text-gray-800 text-lg">Precautions:</strong>
                      <p className="text-gray-600">{item.precautions}</p>
                    </div>
                  )}

                  {item.description && (
                    <div className="flex justify-between">
                      <strong className="text-gray-800 text-lg">Description:</strong>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  )}

                  {index < analysis.length - 1 && <hr className="border-gray-300 my-4" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseDetection;
