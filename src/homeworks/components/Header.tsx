import React from 'react';
import { useUser } from './UserContext';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';

export const Header: React.FC = () => {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const t = translations[language];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ua' ? 'en' : 'ua');
  };

  const themeClasses = theme === 'light' 
    ? 'bg-white text-black border-gray-200' 
    : 'bg-gray-800 text-white border-gray-600';

  return (
    <header className={`p-4 border-b ${themeClasses}`}>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div>
          <h1 className="text-xl font-bold">{t.header.title}</h1>
          <p className="text-sm opacity-75">Привіт, {user.name}!</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className={`px-3 py-1 rounded text-sm ${
              theme === 'light' 
                ? 'bg-gray-200 hover:bg-gray-300 text-black' 
                : 'bg-gray-600 hover:bg-gray-500 text-white'
            }`}
          >
            {t.header.toggleTheme} ({t.theme[theme]})
          </button>
          
          <button
            onClick={toggleLanguage}
            className={`px-3 py-1 rounded text-sm ${
              theme === 'light' 
                ? 'bg-blue-200 hover:bg-blue-300 text-black' 
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {language.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
};
