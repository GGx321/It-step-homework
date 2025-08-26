import { useTheme } from './ThemeContext15';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext15';

export default function Header15() {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  const handleLogin = () => {
    login('John');
  };

  return (
    <header
      className={`border-b-2 p-4 shadow-md transition-colors duration-300 ${
        theme === 'light'
          ? 'border-gray-200 bg-gray-50'
          : 'border-gray-700 bg-gray-800'
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Назва додатку */}
          <div>
            <h1 className="text-2xl font-bold">🎯 {t('contextExample')}</h1>
          </div>

          {/* Інформаційна панель */}
          <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-6">
            {/* Користувач */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                👤 {user ? `${t('hello')}, ${user.name}!` : t('guest')}
              </span>
            </div>

            {/* Поточна тема */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                🎨 {t('currentTheme')}:{' '}
                {theme === 'light' ? t('light') : t('dark')}
              </span>
            </div>

            {/* Поточна мова */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                🌍 {t('language')}: {language.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Кнопки управління */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Кнопка зміни теми */}
            <button
              onClick={toggleTheme}
              className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                theme === 'light'
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-yellow-500 text-black hover:bg-yellow-400'
              }`}
            >
              {theme === 'light' ? '🌙' : '☀️'} {t('toggleTheme')}
            </button>

            {/* Кнопка авторизації */}
            {user ? (
              <button
                onClick={logout}
                className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                  theme === 'light'
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                🚪 {t('logout')}
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                  theme === 'light'
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                🔑 {t('login')}
              </button>
            )}

            {/* Кнопка зміни мови */}
            <button
              onClick={toggleLanguage}
              className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
                theme === 'light'
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              🌐 {t('switchLanguage')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
