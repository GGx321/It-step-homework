import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );

      if (!response.ok) {
        throw new Error('Помилка при завантаженні даних');
      }

      const data: Todo[] = await response.json();

      // Берем только 10 задач
      const randomIndex = Math.floor(Math.random() * (data.length - 10));
      setTodos(data.slice(randomIndex, randomIndex + 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Невідома помилка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Выполняется только при монтировании компонента

  const handleRefresh = () => {
    fetchTodos();
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Завдання 2: Список задач (TodoList)
        </h3>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? '⏳' : '🔄'} Оновити
        </button>
      </div>

      {/* Состояние загрузки */}
      {loading && (
        <div className="py-8 text-center">
          <div className="inline-flex items-center space-x-2 text-blue-600">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <span className="font-medium">Завантаження...</span>
          </div>
        </div>
      )}

      {/* Состояние ошибки */}
      {error && !loading && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-center">
          <div className="mb-2 font-medium text-red-600">❌ Помилка</div>
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Список задач */}
      {!loading && !error && todos.length > 0 && (
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`rounded-lg border-l-4 p-4 ${
                todo.completed
                  ? 'border-green-500 bg-green-50'
                  : 'border-orange-500 bg-orange-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="mb-1 font-medium text-gray-800">
                    {todo.title}
                  </h4>
                  <div className="text-sm text-gray-600">ID: {todo.id}</div>
                </div>
                <div
                  className={`ml-4 rounded-full px-3 py-1 text-sm font-medium ${
                    todo.completed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {todo.completed ? '✅ Виконано' : '🕒 Не виконано'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Информация о API */}
      <div className="mt-6 rounded-md bg-gray-50 p-3 text-xs text-gray-500">
        <p className="mb-1">
          🌐 <strong>API:</strong> https://jsonplaceholder.typicode.com/todos
        </p>
        <p className="mb-1">
          📊 <strong>Дані:</strong> Показано перші 10 задач з{' '}
          {todos.length > 0 ? '200+' : '...'} доступних
        </p>
        <p>
          ⚡ <strong>useEffect:</strong> Автоматичне завантаження при монтажі
          компонента
        </p>
      </div>
    </div>
  );
}
