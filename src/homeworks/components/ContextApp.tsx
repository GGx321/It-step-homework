import React from 'react';
import { UserProvider } from './UserProvider';
import { ThemeProvider } from './ThemeProvider';
import { LanguageProvider } from './LanguageProvider';
import { Header } from './Header';
import { Profile } from './Profile';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  const t = translations[language];

  const themeClasses = theme === 'light' 
    ? 'bg-gray-50 text-black' 
    : 'bg-gray-900 text-white';

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      <Header />
      
      <main className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{t.app.title}</h1>
          <p className="opacity-75">{t.app.description}</p>
        </div>
        
        <div className="max-w-md mx-auto">
          <Profile />
        </div>
        
        {/* Інформація про контексти */}
        <div className={`mt-8 p-4 rounded-lg border ${
          theme === 'light' 
            ? 'bg-blue-50 border-blue-200 text-blue-800' 
            : 'bg-blue-900 border-blue-700 text-blue-200'
        }`}>
          <h3 className="font-semibold mb-2">💡 Використовувані контексти:</h3>
          <ul className="text-sm space-y-1">
            <li>• <strong>UserContext</strong>: зберігає та оновлює дані користувача</li>
            <li>• <strong>ThemeContext</strong>: керує темою (light/dark)</li>
            <li>• <strong>LanguageContext</strong>: перемикає мову (ua/en)</li>
            <li>• Дані передаються без пропсів через useContext</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

const ContextApp: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default ContextApp;
