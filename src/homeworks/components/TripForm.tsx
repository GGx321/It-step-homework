import { useState } from 'react';
import { useAppDispatch } from './redux/hooks';
import { addTrip } from './redux/tripsSlice';

export default function TripForm() {
  const dispatch = useAppDispatch();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!city.trim() || !country.trim()) {
      return;
    }

    dispatch(addTrip({ 
      city: city.trim(), 
      country: country.trim(), 
      year 
    }));
    
    // Очистити форму
    setCity('');
    setCountry('');
    setYear(new Date().getFullYear());
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
        ✈️ Add New Trip
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* City Input */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              🏙️ City
            </label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          {/* Country Input */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              🌍 Country
            </label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 transition-colors"
              required
            />
          </div>

          {/* Year Input */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              📅 Year
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              min="1900"
              max="2100"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        {/* Add Button */}
        <button
          type="submit"
          disabled={!city.trim() || !country.trim()}
          className="w-full rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed md:w-auto"
        >
          ➕ Add Trip
        </button>
      </form>

      {/* Preview */}
      {(city.trim() || country.trim()) && (
        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <p className="font-medium text-gray-800">
            {city.trim() || 'City'}, {country.trim() || 'Country'} ({year})
          </p>
        </div>
      )}
    </div>
  );
}
