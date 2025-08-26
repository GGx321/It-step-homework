import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setSearchCountry, clearAllTrips, selectSearchCountry, selectTripsCount } from './redux/tripsSlice';

export default function TripSearch() {
  const dispatch = useAppDispatch();
  const searchCountry = useAppSelector(selectSearchCountry);
  const tripsCount = useAppSelector(selectTripsCount);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchCountry(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(setSearchCountry(''));
  };

  const handleClearAllTrips = () => {
    if (window.confirm('Are you sure you want to clear all trips?')) {
      dispatch(clearAllTrips());
      dispatch(setSearchCountry(''));
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            🔍 Search by Country
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={searchCountry}
              onChange={handleSearchChange}
              placeholder="Filter trips by country..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            />
            {searchCountry && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Clear search"
              >
                ✖️
              </button>
            )}
          </div>
        </div>

        {/* Trip Counter and Actions */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total trips</p>
            <p className="text-2xl font-bold text-blue-600">{tripsCount}</p>
          </div>

          {tripsCount > 0 && (
            <button
              onClick={handleClearAllTrips}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              🗑️ Clear All
            </button>
          )}
        </div>
      </div>

      {/* Status Message */}
      {tripsCount > 0 && (
        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <p className="text-center text-blue-700">
            ✈️ You have <strong>{tripsCount}</strong> trip{tripsCount !== 1 ? 's' : ''} planned
            {searchCountry && (
              <span> (filtered by "{searchCountry}")</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
