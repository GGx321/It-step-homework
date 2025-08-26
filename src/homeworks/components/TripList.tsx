import { useAppDispatch, useAppSelector } from './redux/hooks';
import { removeTrip, selectFilteredTrips } from './redux/tripsSlice';
import type { Trip } from './redux/tripsSlice';

interface TripItemProps {
  trip: Trip;
  onRemove: (id: string) => void;
}

function TripItem({ trip, onRemove }: TripItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🌍</span>
        <div>
          <p className="font-semibold text-gray-800">
            {trip.city}, {trip.country}
          </p>
          <p className="text-sm text-gray-500">({trip.year})</p>
        </div>
      </div>
      
      <button
        onClick={() => onRemove(trip.id)}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
      >
        🗑️ Remove
      </button>
    </div>
  );
}

export default function TripList() {
  const dispatch = useAppDispatch();
  const filteredTrips = useAppSelector(selectFilteredTrips);

  const handleRemoveTrip = (id: string) => {
    dispatch(removeTrip(id));
  };

  if (filteredTrips.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-lg text-center">
        <div className="mb-4 text-6xl">🧳</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-700">
          No trips found
        </h3>
        <p className="text-gray-500">
          Add your first trip or adjust the search filter
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
        🧳 My Trips
      </h2>
      
      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <TripItem
            key={trip.id}
            trip={trip}
            onRemove={handleRemoveTrip}
          />
        ))}
      </div>
    </div>
  );
}
