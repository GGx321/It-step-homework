import { useState } from 'react';

export default function LikeDislike() {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const resetCounters = () => {
    setLikes(0);
    setDislikes(0);
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Завдання 5: "Подобається / Не подобається"
      </h3>

      <div className="space-y-4">
        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <button
              onClick={handleLike}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl transition-colors hover:bg-green-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              👍
            </button>
            <div className="mt-2 text-lg font-semibold text-green-600">
              {likes}
            </div>
            <div className="text-sm text-gray-600">Лайків</div>
          </div>

          <div className="text-center">
            <button
              onClick={handleDislike}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl transition-colors hover:bg-red-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            >
              👎
            </button>
            <div className="mt-2 text-lg font-semibold text-red-600">
              {dislikes}
            </div>
            <div className="text-sm text-gray-600">Дизлайків</div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="mb-2 text-sm text-gray-600">
            Загальна активність: {likes + dislikes} реакцій
          </p>
          <button
            onClick={resetCounters}
            className="text-sm text-gray-500 underline hover:text-gray-700 focus:outline-none"
          >
            Скинути лічильники
          </button>
        </div>
      </div>
    </div>
  );
}
