import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ua';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Словник перекладів
const translations = {
  en: {
    welcome: 'Welcome!',
    hello: 'Hello',
    guest: 'Guest',
    login: 'Login',
    logout: 'Logout',
    toggleTheme: 'Toggle Theme',
    switchLanguage: 'Switch Language',
    currentTheme: 'Current Theme',
    currentUser: 'Current User',
    light: 'Light',
    dark: 'Dark',
    theme: 'Theme',
    authentication: 'Authentication',
    language: 'Language',
    contextExample: 'Context API Example',
    themeDescription:
      'Click the button to switch between light and dark themes',
    authDescription: 'Login/logout to see the authentication state change',
    languageDescription: 'Switch between English and Ukrainian languages',
  },
  ua: {
    welcome: 'Ласкаво просимо!',
    hello: 'Привіт',
    guest: 'Гість',
    login: 'Увійти',
    logout: 'Вийти',
    toggleTheme: 'Змінити тему',
    switchLanguage: 'Змінити мову',
    currentTheme: 'Поточна тема',
    currentUser: 'Поточний користувач',
    light: 'Світла',
    dark: 'Темна',
    theme: 'Тема',
    authentication: 'Авторизація',
    language: 'Мова',
    contextExample: 'Приклад Context API',
    themeDescription:
      'Натисніть кнопку, щоб переключити між світлою та темною темами',
    authDescription: 'Увійдіть/вийдіть, щоб побачити зміну стану авторизації',
    languageDescription: 'Переключайтеся між англійською та українською мовами',
  },
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('ua');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ua' : 'en'));
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)['en']] || key
    );
  };

  const value = {
    language,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
