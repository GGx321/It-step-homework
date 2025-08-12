import { useState, useRef, useEffect } from 'react';
import Block from '../../components/Block';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Функция для форматирования времени в MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Запуск таймера
  const handleStart = () => {
    if (timerRef.current) return; // таймер уже працює

    setIsRunning(true);
    setIsPaused(false);

    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  // Остановка таймера
  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
  };

  // Сброс таймера
  const handleReset = () => {
    handleStop();
    setSeconds(0);
  };

  // Пауза/продолжение
  const handlePauseResume = () => {
    if (isPaused) {
      // Продолжить
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
      setIsPaused(false);
    } else {
      // Пауза
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setIsPaused(true);
    }
  };

  // Автоматическая остановка после 60 секунд
  useEffect(() => {
    if (seconds >= 60 && isRunning) {
      handleStop();
      alert('Таймер автоматично зупинено після 60 секунд!');
    }
  }, [seconds, isRunning]);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Определение статуса таймера
  const getTimerStatus = () => {
    if (!isRunning && seconds === 0) return 'готовий';
    if (isPaused) return 'на паузі';
    if (isRunning) return 'працює';
    return 'зупинено';
  };

  const getStatusColor = () => {
    if (!isRunning && seconds === 0) return 'text-gray-600';
    if (isPaused) return 'text-yellow-600';
    if (isRunning) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <Block>
        <h2 className="mb-4 text-xl font-bold">
          Домашнє завдання 9: useRef та інтервали
        </h2>
        <p className="text-gray-600">
          Створення таймера з використанням useRef для збереження ID інтервалу
        </p>
      </Block>

      {/* Основной таймер */}
      <Block>
        <div className="text-center">
          <h3 className="mb-6 text-lg font-semibold">⏱️ Таймер</h3>

          {/* Отображение времени */}
          <div className="mb-8">
            <div className="mb-2 font-mono text-6xl font-bold text-blue-600">
              {formatTime(seconds)}
            </div>
            <div className="text-lg text-gray-600">
              {seconds}{' '}
              {seconds === 1 ? 'секунда' : seconds < 5 ? 'секунди' : 'секунд'}
            </div>
            <div className={`text-sm font-medium ${getStatusColor()}`}>
              Статус: {getTimerStatus()}
            </div>
          </div>

          {/* Кнопки управления */}
          <div className="flex flex-wrap justify-center gap-3">
            {/* Кнопка Старт */}
            <button
              onClick={handleStart}
              disabled={isRunning}
              className="rounded-md bg-green-500 px-6 py-2 text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              ▶️ Старт
            </button>

            {/* Кнопка Пауза/Продолжить */}
            {isRunning && (
              <button
                onClick={handlePauseResume}
                className={`rounded-md px-6 py-2 text-white transition-colors ${
                  isPaused
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {isPaused ? '▶️ Продовжити' : '⏸️ Пауза'}
              </button>
            )}

            {/* Кнопка Стоп */}
            <button
              onClick={handleStop}
              disabled={!isRunning && !isPaused}
              className="rounded-md bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              ⏹️ Стоп
            </button>

            {/* Кнопка Сброс */}
            <button
              onClick={handleReset}
              disabled={seconds === 0}
              className="rounded-md bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              🔄 Скинути
            </button>
          </div>

          {/* Прогресс бар до 60 секунд */}
          <div className="mt-6">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-1000"
                style={{ width: `${Math.min((seconds / 60) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Прогрес до автоматичного зупину (60 сек): {Math.min(seconds, 60)}
              /60
            </div>
          </div>
        </div>
      </Block>

      {/* Объяснение кода */}
      <Block className="border border-blue-200 bg-blue-50">
        <h4 className="mb-2 font-medium text-blue-900">🔧 Реалізація:</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>
            • <strong>useState(seconds)</strong> — лічильник секунд, викликає
            ререндер
          </li>
          <li>
            • <strong>useRef(timerRef)</strong> — зберігає ID інтервалу без
            ререндера
          </li>
          <li>
            • <strong>setInterval() + clearInterval()</strong> — керування
            інтервалом
          </li>
          <li>
            • <strong>Захист від подвійного запуску</strong> — перевірка
            timerRef.current
          </li>
          <li>
            • <strong>Cleanup в useEffect</strong> — очищення при демонтажі
          </li>
        </ul>
      </Block>

      {/* Дополнительные возможности */}
      <Block className="border border-green-200 bg-green-50">
        <h4 className="mb-2 font-medium text-green-900">
          ✨ Додаткові можливості:
        </h4>
        <ul className="space-y-1 text-sm text-green-800">
          <li>
            • 📱 <strong>Формат MM:SS</strong> — зручне відображення часу
          </li>
          <li>
            • ⏸️ <strong>Пауза/Продовжити</strong> — тимчасова зупинка без
            скидання
          </li>
          <li>
            • 🔄 <strong>Автостоп після 60 сек</strong> — захист від "забутого"
            таймера
          </li>
          <li>
            • 📊 <strong>Прогрес-бар</strong> — візуальний індикатор прогресу
          </li>
          <li>
            • 🎨 <strong>Статуси та кольори</strong> — інтуїтивний інтерфейс
          </li>
        </ul>
      </Block>
    </div>
  );
}
