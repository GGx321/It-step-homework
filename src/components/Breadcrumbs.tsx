import { Link, useLocation } from 'react-router-dom';
import { getHomeworkByPath } from '../utils/homeworksConfig';

interface BreadcrumbItem {
  path: string;
  label: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] | null {
  if (pathname === '/homeworks') {
    return [{ path: '/homeworks', label: 'Домашки' }];
  }

  // Конкретная домашка
  if (pathname.startsWith('/homeworks/')) {
    const homework = getHomeworkByPath(pathname);
    if (homework) {
      return [
        { path: '/homeworks', label: 'Домашки' },
        { path: homework.path, label: homework.title },
      ];
    }
  }

  // Уроки
  if (pathname === '/classes') {
    return [{ path: '/classes', label: 'Уроки' }];
  }

  // Если маршрут не найден, возвращаем null
  return null;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Получаем хлебные крошки для текущего пути
  const breadcrumbs = generateBreadcrumbs(currentPath);

  // Если для текущего маршрута нет хлебных крошек, не отображаем компонент
  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav className="border-b border-gray-200 bg-gray-100 shadow-lg">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && (
                <svg
                  className="mx-2 h-4 w-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              {index === breadcrumbs.length - 1 ? (
                // Последний элемент - текущая страница, не ссылка
                <span className="font-medium text-gray-600">
                  {breadcrumb.label}
                </span>
              ) : (
                // Предыдущие элементы - ссылки
                <Link
                  to={breadcrumb.path}
                  className="text-gray-500 transition-colors duration-200 hover:text-gray-800"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
