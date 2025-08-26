import { useTheme } from './ThemeContext15';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext15';

export default function Footer15() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { language, t } = useLanguage();

  return (
    <footer
      className={`border-t-2 p-6 transition-colors duration-300 ${
        theme === 'light'
          ? 'border-gray-200 bg-gray-50'
          : 'border-gray-700 bg-gray-800'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Інформація про тему */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              🎨 {t('theme')}
            </h3>
            <div
              className={`rounded-lg p-4 ${
                theme === 'light' ? 'bg-white' : 'bg-gray-900'
              }`}
            >
              <p className="text-sm">
                {t('currentTheme')}:
                <span
                  className={`ml-2 rounded px-2 py-1 text-xs font-medium ${
                    theme === 'light'
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-gray-700 text-gray-200'
                  }`}
                >
                  {theme === 'light' ? t('light') : t('dark')}
                </span>
              </p>
              <p className="mt-2 text-xs opacity-75">{t('themeDescription')}</p>
            </div>
          </div>

          {/* Інформація про користувача */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              👤 {t('authentication')}
            </h3>
            <div
              className={`rounded-lg p-4 ${
                theme === 'light' ? 'bg-white' : 'bg-gray-900'
              }`}
            >
              <p className="text-sm">
                {t('currentUser')}:
                <span
                  className={`ml-2 rounded px-2 py-1 text-xs font-medium ${
                    user
                      ? 'bg-green-200 text-green-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {user ? user.name : t('guest')}
                </span>
              </p>
              <p className="mt-2 text-xs opacity-75">{t('authDescription')}</p>
            </div>
          </div>

          {/* Інформація про мову */}
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              🌍 {t('language')}
            </h3>
            <div
              className={`rounded-lg p-4 ${
                theme === 'light' ? 'bg-white' : 'bg-gray-900'
              }`}
            >
              <p className="text-sm">
                {t('language')}:
                <span
                  className={`ml-2 rounded px-2 py-1 text-xs font-medium ${
                    language === 'en'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-purple-200 text-purple-800'
                  }`}
                >
                  {language === 'en' ? 'English' : 'Українська'}
                </span>
              </p>
              <p className="mt-2 text-xs opacity-75">
                {t('languageDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Розділювач */}
        <div
          className={`my-6 h-px ${theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'}`}
        ></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm opacity-75">
            📚 Context API • React • TypeScript • 2024
          </p>
        </div>
      </div>
    </footer>
  );
}
