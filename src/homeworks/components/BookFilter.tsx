import { useState, useEffect, useRef } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

const BOOKS_DATA: Book[] = [
  {
    id: 1,
    title: 'Гаррі Поттер і філософський камінь',
    author: 'Дж.К. Ролінг',
    genre: 'Фентезі',
  },
  { id: 2, title: '1984', author: 'Джордж Орвелл', genre: 'Антиутопія' },
  {
    id: 3,
    title: 'Гордість і упередження',
    author: 'Джейн Остін',
    genre: 'Романтика',
  },
  { id: 4, title: 'Вбити пересмішника', author: 'Харпер Лі', genre: 'Драма' },
  {
    id: 5,
    title: 'Володар перснів',
    author: 'Дж.Р.Р. Толкін',
    genre: 'Фентезі',
  },
  {
    id: 6,
    title: 'Великий Гетсбі',
    author: 'Ф. Скотт Фіцджеральд',
    genre: 'Класика',
  },
  {
    id: 7,
    title: 'Сто років самотності',
    author: 'Габріель Гарсія Маркес',
    genre: 'Магічний реалізм',
  },
  {
    id: 8,
    title: 'Злочин і кара',
    author: 'Федір Достоєвський',
    genre: 'Класика',
  },
  { id: 9, title: 'Хоббіт', author: 'Дж.Р.Р. Толкін', genre: 'Фентезі' },
  { id: 10, title: 'Джейн Ейр', author: 'Шарлотта Бронте', genre: 'Романтика' },
  {
    id: 11,
    title: 'Дивний новий світ',
    author: 'Олдос Хакслі',
    genre: 'Антиутопія',
  },
  { id: 12, title: 'Анна Кареніна', author: 'Лев Толстой', genre: 'Класика' },
];

const GENRES = [
  'Всі жанри',
  'Фентезі',
  'Антиутопія',
  'Романтика',
  'Драма',
  'Класика',
  'Магічний реалізм',
];

export default function BookFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Всі жанри');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(BOOKS_DATA);

  // Ref для хранения ID таймера debounce
  const timeoutRef = useRef<number | null>(null);

  // Debounce для поискового запроса
  useEffect(() => {
    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Устанавливаем новый таймер
    timeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    // Cleanup функция
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Фильтрация книг при изменении debouncedSearchTerm или selectedGenre
  useEffect(() => {
    let filtered = BOOKS_DATA;

    // Фильтрация по названию (с debounce)
    if (debouncedSearchTerm.trim()) {
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
    }

    // Фильтрация по жанру
    if (selectedGenre !== 'Всі жанри') {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    setFilteredBooks(filtered);
  }, [debouncedSearchTerm, selectedGenre]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.target.value);
  };

  const isSearching = searchTerm !== debouncedSearchTerm;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">
        Завдання 3: Комбінована фільтрація книг
      </h2>

      {/* Поля фильтрации */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        {/* Поиск по названию */}
        <div>
          <label
            htmlFor="book-search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Пошук за назвою:
          </label>
          <input
            id="book-search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Введіть назву книги..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-500">
            Пошук виконується через 500 мс після останнього введення
            {isSearching && <span className="text-blue-600"> (пошук...)</span>}
          </p>
        </div>

        {/* Выбор жанра */}
        <div>
          <label
            htmlFor="genre-select"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Фільтр за жанром:
          </label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Информация о фильтрах */}
      <div className="mb-4 text-sm text-gray-600">
        <div className="flex flex-wrap gap-2">
          <span>
            Знайдено {filteredBooks.length} з {BOOKS_DATA.length} книг
          </span>
          {debouncedSearchTerm && (
            <span className="rounded bg-blue-100 px-2 py-1 text-blue-800">
              назва: "{debouncedSearchTerm}"
            </span>
          )}
          {selectedGenre !== 'Всі жанри' && (
            <span className="rounded bg-green-100 px-2 py-1 text-green-800">
              жанр: {selectedGenre}
            </span>
          )}
        </div>
      </div>

      {/* Список книг */}
      {filteredBooks.length === 0 ? (
        <div className="rounded-lg bg-gray-50 py-8 text-center text-gray-500">
          <div className="mb-2 text-lg font-medium">
            📚 Результатів не знайдено
          </div>
          <p>Спробуйте змінити критерії пошуку:</p>
          <ul className="mt-2 text-sm">
            <li>• Перевірте правильність написання</li>
            <li>• Оберіть інший жанр</li>
            <li>• Очистіть фільтри</li>
          </ul>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                {book.title}
              </h3>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-medium">Автор:</span> {book.author}
              </p>
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                {book.genre}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
