import { useState, useEffect } from 'react';

export default function AutoCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId: number | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 10); // 10ms интервал для точности миллисекунд (каждый тик = 1 сантисекунда)
    }

    // Cleanup function - обязательно очищаем интервал
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); // Зависимость от isRunning

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleContinue = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setCount(0);
    setIsRunning(false);
  };

  // Вычисляем минуты, секунды и сантисекунды
  const totalSeconds = Math.floor(count / 100); // Каждые 100 тиков = 1 секунда
  const minutes = Math.floor(totalSeconds / 60); // Каждые 60 секунд = 1 минута
  const seconds = totalSeconds % 60; // Остаток секунд после вычета минут
  const centiseconds = count % 100; // Сантисекунды (0-99)

  // Форматируем время в зависимости от наличия минут
  const formatTime = () => {
    if (minutes > 0) {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    } else {
      return `${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    }
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Завдання 1: Автоматичний лічільник
      </h3>

      <div className="space-y-6">
        {/* Отображение счетчика */}
        <div className="text-center">
          {/* Фиксированная ширина контейнера для предотвращения дерганья */}
          <div className="font-mono text-6xl font-bold text-blue-600">
            {formatTime()}
          </div>
          <div className="text-sm text-gray-500">
            Статус:{' '}
            {isRunning ? (
              <span className="font-medium text-green-600">🟢 Працює</span>
            ) : (
              <span className="font-medium text-red-600">🔴 Зупинено</span>
            )}
          </div>
        </div>

        {/* Кнопки управления */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Зупинити
          </button>

          <button
            onClick={handleContinue}
            disabled={isRunning}
            className="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Продовжити
          </button>

          <button
            onClick={handleReset}
            className="rounded-md bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
          >
            Скинути
          </button>
        </div>

        {/* Информация о работе */}
        <div className="rounded-md bg-gray-50 p-3 text-xs text-gray-500">
          <p className="mb-1">
            ⚡ <strong>useEffect:</strong> Автоматично стартує таймер при
            завантаженні
          </p>
          <p className="mb-1">
            🧹 <strong>Cleanup:</strong> Очищує інтервал при демонтажі
            компонента
          </p>
          <p className="mb-1">
            🔒 <strong>Безпека:</strong> Запобігає створенню кількох інтервалів
          </p>
          <p className="mb-1">
            ⏱️ <strong>Точність:</strong> Оновлення кожні 10мс (сантисекунди
            0-99)
          </p>
          <p>
            📏 <strong>Формат: </strong>
            ХХ:ХХ:ХХ (хв:сек:сантисек)
          </p>
        </div>
      </div>
    </div>
  );
}
