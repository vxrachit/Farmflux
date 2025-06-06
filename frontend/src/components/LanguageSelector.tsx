import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../translations';

function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
      aria-label={getTranslation(language, 'language')}
    >
      <Languages className="h-5 w-5" />
      <span>{language === 'en' ? 'EN' : 'हिं'}</span>
    </button>
  );
}

export default LanguageSelector;
