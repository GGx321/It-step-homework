import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-md p-8 text-center">
        {/* Великий 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 select-none">404</h1>
        </div>

        {/* Смайлик та повідомлення */}
        <div className="mb-8 space-y-4">
          <div className="text-6xl">🤔</div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Упс! Страница не найдена
          </h2>
          <p className="leading-relaxed text-gray-600">
            Похоже, что страница, которую вы ищете, не существует или была
            перемещена. Может быть, вы ввели неправильный адрес?
          </p>
        </div>

        {/* Кнопки навигации */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            🏠 На главную
          </Link>

          <Link
            to="/homeworks"
            className="inline-block w-full rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-300"
          >
            📚 Посмотреть домашки
          </Link>
        </div>
      </div>
    </div>
  );
}
