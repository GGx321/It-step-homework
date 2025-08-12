import { useState } from 'react';

export default function StarRating() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const ratingTexts: Record<number, string> = {
    1: 'Жахливо',
    2: 'Погано',
    3: 'Задовільно',
    4: 'Добре',
    5: 'Відмінно',
  };

  const ratingColors: Record<number, string> = {
    1: 'text-red-600',
    2: 'text-orange-600',
    3: 'text-yellow-600',
    4: 'text-blue-600',
    5: 'text-green-600',
  };

  const handleStarClick = (starNumber: number) => {
    setRating(starNumber);
  };

  const handleStarHover = (starNumber: number) => {
    setHoveredRating(starNumber);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const resetRating = () => {
    setRating(0);
    setHoveredRating(0);
  };

  const displayRating = hoveredRating || rating;

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-gray-800">
        Завдання 2: Рейтинг із текстом
      </h3>

      <div className="space-y-4 text-center">
        {/* Звезды */}
        <div
          className="flex justify-center space-x-1"
          onMouseLeave={handleMouseLeave}
        >
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <button
              key={starNumber}
              onClick={() => handleStarClick(starNumber)}
              onMouseEnter={() => handleStarHover(starNumber)}
              className="text-4xl transition-transform hover:scale-110 focus:scale-110 focus:outline-none"
            >
              <span
                className={
                  starNumber <= displayRating
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }
              >
                ⭐
              </span>
            </button>
          ))}
        </div>

        {/* Текстовая интерпретация */}
        <div className="flex h-16 items-center justify-center">
          {displayRating > 0 && (
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${ratingColors[displayRating]} mb-1`}
              >
                {ratingTexts[displayRating]}
              </div>
              <div className="text-sm text-gray-500">
                Оцінка: {displayRating} з 5 зірок
              </div>
            </div>
          )}

          {displayRating === 0 && (
            <div className="text-center text-gray-500">
              <p className="mb-1 text-lg">🌟</p>
              <p>Натисніть на зірки для оцінки</p>
            </div>
          )}
        </div>

        {/* Кнопка сброса */}
        {rating > 0 && (
          <button
            onClick={resetRating}
            className="text-sm text-gray-500 underline hover:text-gray-700 focus:outline-none"
          >
            Скинути оцінку
          </button>
        )}

        {/* Подробная статистика */}
        {rating > 0 && (
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <h4 className="mb-2 font-medium text-gray-800">Деталі оцінки:</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                ✨ Обрана оцінка:{' '}
                <span className="font-medium">{rating}/5</span>
              </p>
              <p>
                💭 Інтерпретація:{' '}
                <span className={`font-medium ${ratingColors[rating]}`}>
                  {ratingTexts[rating]}
                </span>
              </p>
              <p>
                📊 Відсоток:{' '}
                <span className="font-medium">
                  {Math.round((rating / 5) * 100)}%
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
