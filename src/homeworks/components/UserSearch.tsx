import { useState, useEffect, useRef } from 'react';

interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubUser[];
}

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  // Ref для хранения ID таймера
  const timeoutRef = useRef<number | null>(null);

  // Функция для выполнения поиска
  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      setTotalCount(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=20`,
      );

      if (!response.ok) {
        throw new Error(`Помилка API: ${response.status}`);
      }

      const data: GitHubSearchResponse = await response.json();
      setUsers(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Сталася помилка при пошуку',
      );
      setUsers([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Debounce логика через useEffect
  useEffect(() => {
    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Устанавливаем новый таймер
    timeoutRef.current = setTimeout(() => {
      searchUsers(searchTerm);
    }, 500);

    // Cleanup функция для очистки таймера
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">
        Завдання 2: Пошук користувачів GitHub
      </h2>

      {/* Поле поиска */}
      <div className="mb-4">
        <label
          htmlFor="user-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Пошук користувачів:
        </label>
        <input
          id="user-search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Введіть ім'я користувача..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-gray-500">
          Пошук виконується через 500 мс після останнього введення
        </p>
      </div>

      {/* Индикатор загрузки */}
      {loading && (
        <div className="mb-4 flex items-center">
          <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <span className="ml-2 text-sm">Пошук користувачів...</span>
        </div>
      )}

      {/* Ошибка */}
      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {/* Информация о результатах */}
      {!loading && searchTerm && (
        <div className="mb-4 text-sm text-gray-600">
          {users.length > 0 ? (
            <>
              Знайдено {users.length} з {totalCount} користувачів для "
              {searchTerm}"
            </>
          ) : (
            searchTerm &&
            !error && <>Користувачів за запитом "{searchTerm}" не знайдено</>
          )}
        </div>
      )}

      {/* Список пользователей */}
      {users.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <a
              key={user.id}
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-between space-x-3 rounded-lg border border-gray-200 px-4 py-2 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    className="h-12 w-12 rounded-full"
                  />
                  <p className="truncate text-sm font-medium text-gray-900">
                    {user.login}
                  </p>
                </div>
                <span>{'>'}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Состояние "нет поискового запроса" */}
      {!searchTerm && !loading && (
        <div className="py-8 text-center text-gray-500">
          Введіть ім'я користувача для пошуку
        </div>
      )}
    </div>
  );
}
