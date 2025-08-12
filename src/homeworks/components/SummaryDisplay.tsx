interface SummaryDisplayProps {
  movieTitle: string;
  rating: number;
  comment: string;
}

// Мапинг значений фильмов на их отображаемые названия
const MOVIE_TITLES: Record<string, string> = {
  inception: 'Inception',
  titanic: 'Titanic',
  matrix: 'Matrix',
  interstellar: 'Interstellar',
  avatar: 'Avatar',
  joker: 'Joker',
  avengers: 'Avengers: Endgame',
};

// Функция для получения эмодзи по рейтингу
const getRatingEmoji = (rating: number): string => {
  if (rating >= 9) return '🤩';
  if (rating >= 7) return '😍';
  if (rating >= 5) return '😊';
  if (rating >= 3) return '😐';
  return '😞';
};

// Функция для получения цвета рейтинга
const getRatingColor = (rating: number): string => {
  if (rating >= 8) return 'text-green-600';
  if (rating >= 6) return 'text-yellow-600';
  if (rating >= 4) return 'text-orange-600';
  return 'text-red-600';
};

export default function SummaryDisplay({
  movieTitle,
  rating,
  comment,
}: SummaryDisplayProps) {
  const displayTitle = MOVIE_TITLES[movieTitle] || movieTitle;
  const hasData = movieTitle || rating > 1 || comment;

  if (!hasData) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
        <div className="mb-2 text-4xl">🎬</div>
        <p>Заповніть форму, щоб побачити підсумок</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-blue-900">
        📋 Підсумок оцінки
      </h3>

      <div className="space-y-3">
        {/* Фильм */}
        <div className="flex items-center">
          <span className="w-20 font-medium text-gray-700">Фільм:</span>
          <span className="text-gray-900">
            {movieTitle ? (
              <>🎬 {displayTitle}</>
            ) : (
              <span className="text-gray-400 italic">не обрано</span>
            )}
          </span>
        </div>

        {/* Оценка */}
        <div className="flex items-center">
          <span className="w-20 font-medium text-gray-700">Оцінка:</span>
          <span className={`font-bold ${getRatingColor(rating)}`}>
            {rating > 1 ? (
              <>
                {getRatingEmoji(rating)} {rating}/10
              </>
            ) : (
              <span className="text-gray-400 italic">не встановлено</span>
            )}
          </span>
        </div>

        {/* Комментарий */}
        <div className="flex items-start">
          <span className="w-20 pt-1 font-medium text-gray-700">Коментар:</span>
          <div className="flex-1">
            {comment ? (
              <p className="rounded border bg-white p-3 text-gray-900 italic">
                "{comment}"
              </p>
            ) : (
              <span className="text-gray-400 italic">не додано</span>
            )}
          </div>
        </div>
      </div>

      {/* Индикатор полноты заполнения */}
      {movieTitle && rating > 1 && comment && (
        <div className="mt-4 rounded-lg border border-green-300 bg-green-100 p-3">
          <div className="flex items-center text-green-800">
            <span className="mr-2 text-lg">✅</span>
            <span className="font-medium">Форма повністю заповнена!</span>
          </div>
        </div>
      )}
    </div>
  );
}
