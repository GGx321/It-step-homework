import React, { useState, useMemo, useCallback } from 'react';
import UserItem from './UserItem';

interface User {
  id: number;
  name: string;
  age: number;
}

const USERS: User[] = [
  { id: 1, name: 'Анна', age: 25 },
  { id: 2, name: 'Олег', age: 30 },
  { id: 3, name: 'Ірина', age: 22 },
  { id: 4, name: 'Сергій', age: 28 },
  { id: 5, name: 'Марина', age: 35 },
];

const UserFilterApp: React.FC = () => {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // useMemo для мемоізації фільтрації та сортування
  // Залежності: [search, sortAsc]
  const filteredAndSortedUsers = useMemo(() => {
    console.log('🔄 Виконується фільтрація та сортування');

    // Фільтрація за ім'ям (реєстр не враховується)
    const filtered = USERS.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );

    // Сортування за віком
    const sorted = filtered.sort((a, b) => {
      return sortAsc ? a.age - b.age : b.age - a.age;
    });

    return sorted;
  }, [search, sortAsc]);

  // useCallback для стабільності функції
  const handleUserClick = useCallback((user: User) => {
    alert(`${user.name}, ${user.age} років`);
  }, []);

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Фільтр користувачів з оптимізацією
        </h2>
        <p className="text-gray-600">
          Демонстрація useMemo, useCallback та React.memo
        </p>
      </div>

      {/* Поле пошуку */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук за ім'ям..."
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {/* Кнопка сортування */}
      <div>
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Сортувати за віком ({sortAsc ? 'за зростанням' : 'за спаданням'})
        </button>
      </div>

      {/* Список користувачів */}
      <div className="space-y-2">
        {filteredAndSortedUsers.map((user) => (
          <UserItem key={user.id} user={user} onUserClick={handleUserClick} />
        ))}
      </div>

      {/* Інформація про оптимізацію */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-semibold text-blue-800">💡 Оптимізації:</h4>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>
            • <strong>useMemo</strong>: Фільтрація перераховується тільки при
            зміні [search, sortAsc]
          </li>
          <li>
            • <strong>useCallback</strong>: handleUserClick стабільна між
            рендерами
          </li>
          <li>
            • <strong>React.memo</strong>: UserItem рендериться тільки при зміні
            пропсів
          </li>
          <li>• Відкрийте консоль браузера, щоб побачити логи оптимізації</li>
        </ul>
      </div>
    </div>
  );
};

export default UserFilterApp;
