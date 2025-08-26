import { useState, useEffect } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  count: number;
  results: Pokemon[];
}

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState(10);
  const [tempLimit, setTempLimit] = useState(10);

  const fetchPokemon = async (pokemonLimit: number = limit) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get<PokemonResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}`,
      );

      setPokemon(response.data.results);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Помилка запиту: ${err.message}`);
      } else {
        setError('Невідома помилка при завантаженні покемонів');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleLimitChange = () => {
    if (tempLimit > 0 && tempLimit <= 1000) {
      setLimit(tempLimit);
      fetchPokemon(tempLimit);
    }
  };

  const getPokemonId = (url: string) => {
    const segments = url.split('/');
    return segments[segments.length - 2];
  };

  const getPokemonImageUrl = (url: string) => {
    const id = getPokemonId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          🎮 Список Покемонів
        </h2>
        <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          🎮 Список Покемонів
        </h2>
        <div className="text-red-600">
          <p>{error}</p>
          <button
            onClick={() => fetchPokemon()}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            Спробувати знову
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          🎮 Список Покемонів
        </h2>

        <div className="flex items-center gap-2">
          <label htmlFor="pokemon-limit" className="text-sm text-gray-600">
            Кількість:
          </label>
          <input
            id="pokemon-limit"
            type="number"
            min="1"
            max="1000"
            value={tempLimit}
            onChange={(e) => setTempLimit(Number(e.target.value))}
            className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            onClick={handleLimitChange}
            disabled={loading}
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
          >
            OK
          </button>
          <button
            onClick={() => fetchPokemon()}
            disabled={loading}
            className="rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Завантаження...' : 'Оновити'}
          </button>
        </div>
      </div>

      {pokemon.length === 0 ? (
        <p className="text-gray-500">Немає покемонів для відображення</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {pokemon.map((poke) => {
            const pokemonId = getPokemonId(poke.url);
            return (
              <div
                key={poke.name}
                className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 p-4 transition-shadow hover:shadow-lg"
              >
                <div className="text-center">
                  <img
                    src={getPokemonImageUrl(poke.url)}
                    alt={poke.name}
                    className="mx-auto mb-2 h-16 w-16"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {poke.name}
                  </h3>
                  <p className="mb-2 text-sm text-gray-500">#{pokemonId}</p>
                  <a
                    href={poke.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded bg-purple-500 px-3 py-1 text-sm text-white transition-colors hover:bg-purple-600"
                  >
                    Деталі
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">
        Показано {pokemon.length} из {limit}
      </p>
    </div>
  );
}
