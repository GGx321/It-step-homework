import { useState, useEffect } from 'react';

interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  details?: string;
}

export default function UpcomingLaunches() {
  const [launches, setLaunches] = useState<SpaceXLaunch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://api.spacexdata.com/v4/launches/upcoming',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SpaceXLaunch[] = await response.json();

      // Сортувати за датою (найближчі вгорі)
      const sortedLaunches = data.sort(
        (a, b) =>
          new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime(),
      );

      setLaunches(sortedLaunches);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch launches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          🚀 Майбутні запуски SpaceX
        </h2>
        <div className="animate-pulse">
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="mb-2 h-4 w-1/2 rounded bg-gray-200"></div>
          <div className="h-4 w-2/3 rounded bg-gray-200"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          🚀 Майбутні запуски SpaceX
        </h2>
        <div className="text-red-600">
          <p>Помилка завантаження: {error}</p>
          <button
            onClick={fetchLaunches}
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            Спробувати знову
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          🚀 Майбутні запуски SpaceX
        </h2>
        <button
          onClick={fetchLaunches}
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Завантаження...' : 'Оновити'}
        </button>
      </div>

      {launches.length === 0 ? (
        <p className="text-gray-500">Немає запланованих запусків</p>
      ) : (
        <div className="space-y-4">
          {launches.slice(0, 10).map((launch) => (
            <div
              key={launch.id}
              className="rounded border-l-4 border-blue-500 bg-gray-50 py-2 pl-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {launch.name}
              </h3>
              <p className="text-gray-600">
                📅 Дата запуску: {formatDate(launch.date_utc)}
              </p>
              {launch.details && (
                <p className="mt-1 text-sm text-gray-500">{launch.details}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-sm text-gray-500">Загружено с SpaceX API</p>
    </div>
  );
}
