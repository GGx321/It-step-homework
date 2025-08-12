import { useState, useEffect } from 'react';

interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
}

export default function CountriesList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка списка стран при монтировании компонента
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags',
        );

        if (!response.ok) {
          throw new Error('Не вдалося завантажити список країн');
        }

        const data: Country[] = await response.json();
        // Сортируем страны по алфавиту
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common),
        );

        setCountries(sortedCountries);
        setFilteredCountries(sortedCountries);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Сталася помилка');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Фильтрация стран при изменении поискового запроса
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredCountries(filtered);
    }
  }, [searchTerm, countries]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Завдання 1: Список країн</h2>
        <div className="flex h-32 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <span className="ml-2">Завантаження країн...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold">Завдання 1: Список країн</h2>
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          Помилка: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Завдання 1: Список країн</h2>

      {/* Поле поиска */}
      <div className="mb-4">
        <label
          htmlFor="country-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Пошук країн:
        </label>
        <input
          id="country-search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Введіть назву країни..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Информация о результатах */}
      <div className="mb-4 text-sm text-gray-600">
        {searchTerm ? (
          <>
            Знайдено {filteredCountries.length} країн для запиту "{searchTerm}"
          </>
        ) : (
          <>Усього країн: {countries.length}</>
        )}
      </div>

      {/* Список стран */}
      {filteredCountries.length === 0 ? (
        <div className="py-8 text-center text-gray-500">
          {searchTerm ? (
            <>Країн за запитом "{searchTerm}" не знайдено</>
          ) : (
            <>Немає країн для відображення</>
          )}
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto">
          <ul className="space-y-1">
            {filteredCountries.map((country, index) => (
              <li
                key={`${country.name.common}-${index}`}
                className="flex items-center space-x-3 rounded border-b border-gray-100 px-3 py-2 last:border-b-0 hover:bg-gray-50"
              >
                <img
                  src={country.flags.png}
                  alt={country.flags.alt || `Прапор ${country.name.common}`}
                  className="h-4 w-6 rounded-sm object-cover"
                />
                <span>{country.name.common}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
