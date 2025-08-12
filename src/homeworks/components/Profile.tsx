import React from 'react';
import { useUser } from './UserContext';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';

export const Profile: React.FC = () => {
  const { user, setUser } = useUser();
  const { theme } = useTheme();
  const { language } = useLanguage();

  const t = translations[language];

  const changeName = () => {
    const newName = prompt("Введіть нове ім'я:", user.name);
    if (newName && newName.trim()) {
      setUser((prev) => ({ ...prev, name: newName.trim() }));
    }
  };

  const themeClasses =
    theme === 'light'
      ? 'bg-white text-black border-gray-200'
      : 'bg-gray-800 text-white border-gray-600';

  return (
    <div className={`rounded-lg border p-6 ${themeClasses}`}>
      <h2 className="mb-4 text-lg font-semibold">{t.profile.title}</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium opacity-75">
            Ім'я:
          </label>
          <p className="text-lg">{user.name}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium opacity-75">
            {t.profile.email}:
          </label>
          <p className="text-lg">{user.email}</p>
        </div>

        <button
          onClick={changeName}
          className={`mt-4 rounded px-4 py-2 ${
            theme === 'light'
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {t.profile.changeName}
        </button>
      </div>
    </div>
  );
};
