import { useState } from 'react';

export default function PasswordToggle() {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Завдання 4: Перемикання видимості пароля
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="password-input"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Введіть пароль:
          </label>
          <div className="relative">
            <input
              id="password-input"
              type={isVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ваш пароль..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-12 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={toggleVisibility}
              className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 focus:outline-none"
              type="button"
            >
              {isVisible ? (
                <span className="text-sm">🙈</span>
              ) : (
                <span className="text-sm">👁️</span>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={toggleVisibility}
          className="w-full rounded-md bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
        >
          {isVisible ? 'Приховати' : 'Показати'} пароль
        </button>

        {password && (
          <div className="text-sm text-gray-600">
            Пароль: {isVisible ? password : '•'.repeat(password.length)}
          </div>
        )}
      </div>
    </div>
  );
}
