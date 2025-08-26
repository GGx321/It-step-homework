import { useTheme } from './ThemeContext15';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext15';

export default function Main15() {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Головне привітання */}
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold">{t('welcome')}</h2>
          <p className="text-lg opacity-75">
            {user
              ? `${t('hello')}, ${user.name}! Ви використовуєте ${theme === 'light' ? t('light').toLowerCase() : t('dark').toLowerCase()} тему.`
              : `${t('guest')}, ласкаво просимо! Поточна тема: ${theme === 'light' ? t('light').toLowerCase() : t('dark').toLowerCase()}.`}
          </p>
        </div>

        {/* Демонстраційні картки */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Картка теми */}
          <div
            className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100'
                : 'bg-gradient-to-br from-gray-800 to-gray-900'
            }`}
          >
            <div className="text-center">
              <div className="mb-4 text-4xl">
                {theme === 'light' ? '☀️' : '🌙'}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t('theme')}</h3>
              <p className="mb-4 text-sm opacity-75">{t('themeDescription')}</p>
              <div
                className={`rounded-lg p-3 text-sm ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-700'
                }`}
              >
                <p>
                  <strong>{t('currentTheme')}:</strong>{' '}
                  {theme === 'light' ? t('light') : t('dark')}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`mt-4 rounded-lg px-6 py-2 font-medium transition-colors ${
                  theme === 'light'
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-yellow-500 text-black hover:bg-yellow-400'
                }`}
              >
                {t('toggleTheme')}
              </button>
            </div>
          </div>

          {/* Картка авторизації */}
          <div
            className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gradient-to-br from-blue-100 to-purple-100'
                : 'bg-gradient-to-br from-blue-900 to-purple-900'
            }`}
          >
            <div className="text-center">
              <div className="mb-4 text-4xl">{user ? '👤' : '👻'}</div>
              <h3 className="mb-2 text-xl font-semibold">
                {t('authentication')}
              </h3>
              <p className="mb-4 text-sm opacity-75">{t('authDescription')}</p>
              <div
                className={`rounded-lg p-3 text-sm ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-700'
                }`}
              >
                <p>
                  <strong>{t('currentUser')}:</strong>{' '}
                  {user ? user.name : t('guest')}
                </p>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {user ? (
                  <button
                    onClick={logout}
                    className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
                  >
                    {t('logout')}
                  </button>
                ) : (
                  <button
                    onClick={() => login('John')}
                    className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600"
                  >
                    {t('login')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Картка мови */}
          <div
            className={`rounded-xl p-6 shadow-lg transition-all duration-300 ${
              theme === 'light'
                ? 'bg-gradient-to-br from-green-100 to-teal-100'
                : 'bg-gradient-to-br from-green-900 to-teal-900'
            }`}
          >
            <div className="text-center">
              <div className="mb-4 text-4xl">🌍</div>
              <h3 className="mb-2 text-xl font-semibold">{t('language')}</h3>
              <p className="mb-4 text-sm opacity-75">
                {t('languageDescription')}
              </p>
              <div
                className={`rounded-lg p-3 text-sm ${
                  theme === 'light' ? 'bg-white' : 'bg-gray-700'
                }`}
              >
                <p>
                  <strong>{t('language')}:</strong>{' '}
                  {language === 'en' ? 'English' : 'Українська'}
                </p>
              </div>
              <button
                onClick={toggleLanguage}
                className={`mt-4 rounded-lg px-6 py-2 font-medium transition-colors ${
                  theme === 'light'
                    ? 'bg-teal-500 text-white hover:bg-teal-600'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                {t('switchLanguage')}
              </button>
            </div>
          </div>
        </div>

        {/* Інтерактивна демонстрація */}
        <div
          className={`rounded-xl p-8 shadow-lg ${
            theme === 'light'
              ? 'bg-gradient-to-r from-purple-100 to-pink-100'
              : 'bg-gradient-to-r from-purple-900 to-pink-900'
          }`}
        >
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold">🎯 Context API у дії</h3>
            <p className="mb-6 text-lg opacity-75">
              Всі компоненти отримують доступ до глобального стану через Context
              API
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div
                className={`rounded-lg p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
              >
                <h4 className="font-semibold">ThemeProvider</h4>
                <p className="text-sm opacity-75">Управляє темою додатку</p>
              </div>
              <div
                className={`rounded-lg p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
              >
                <h4 className="font-semibold">AuthProvider</h4>
                <p className="text-sm opacity-75">Управляє авторизацією</p>
              </div>
              <div
                className={`rounded-lg p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
              >
                <h4 className="font-semibold">LanguageProvider</h4>
                <p className="text-sm opacity-75">Управляє мовою інтерфейсу</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
