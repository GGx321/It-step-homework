import { Provider } from 'react-redux';
import { store } from './redux/store';
import TripForm from './TripForm';
import TripSearch from './TripSearch';
import TripList from './TripList';

function TravelAppContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-600">
            Plan and track your dream destinations
          </p>
        </div>

        <div className="space-y-6">
          {/* Add Trip Form */}
          <TripForm />

          {/* Search and Stats */}
          <TripSearch />

          {/* Trips List */}
          <TripList />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="rounded-lg bg-white/80 p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              🎯 Features Implemented
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg bg-green-100 p-3">
                <div className="mb-2 text-2xl">✅</div>
                <p className="text-sm font-medium">Redux Toolkit</p>
                <p className="text-xs text-gray-600">Global state management</p>
              </div>
              <div className="rounded-lg bg-blue-100 p-3">
                <div className="mb-2 text-2xl">🔍</div>
                <p className="text-sm font-medium">Search & Filter</p>
                <p className="text-xs text-gray-600">Filter by country</p>
              </div>
              <div className="rounded-lg bg-purple-100 p-3">
                <div className="mb-2 text-2xl">📊</div>
                <p className="text-sm font-medium">Trip Counter</p>
                <p className="text-xs text-gray-600">Track total trips</p>
              </div>
              <div className="rounded-lg bg-red-100 p-3">
                <div className="mb-2 text-2xl">🗑️</div>
                <p className="text-sm font-medium">Clear All</p>
                <p className="text-xs text-gray-600">Remove all trips</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TravelApp() {
  return (
    <Provider store={store}>
      <TravelAppContent />
    </Provider>
  );
}
