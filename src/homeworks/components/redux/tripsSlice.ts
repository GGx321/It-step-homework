import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Trip {
  id: string;
  city: string;
  country: string;
  year: number;
}

export interface TripsState {
  trips: Trip[];
  searchCountry: string;
}

const initialState: TripsState = {
  trips: [
    {
      id: '1',
      city: 'Paris',
      country: 'France',
      year: 2024,
    },
    {
      id: '2',
      city: 'Lviv',
      country: 'Ukraine',
      year: 2022,
    },
    {
      id: '3',
      city: 'Tokyo',
      country: 'Japan',
      year: 2023,
    },
  ],
  searchCountry: '',
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    addTrip: (
      state,
      action: PayloadAction<{ city: string; country: string; year: number }>,
    ) => {
      const newTrip: Trip = {
        id: Date.now().toString(),
        city: action.payload.city,
        country: action.payload.country,
        year: action.payload.year,
      };
      state.trips.push(newTrip);
    },
    removeTrip: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
    },
    clearAllTrips: (state) => {
      state.trips = [];
    },
    setSearchCountry: (state, action: PayloadAction<string>) => {
      state.searchCountry = action.payload;
    },
  },
});

export const { addTrip, removeTrip, clearAllTrips, setSearchCountry } =
  tripsSlice.actions;

// Селектори
export const selectTrips = (state: { trips: TripsState }) => state.trips.trips;
export const selectSearchCountry = (state: { trips: TripsState }) =>
  state.trips.searchCountry;
export const selectFilteredTrips = (state: { trips: TripsState }) => {
  const { trips, searchCountry } = state.trips;
  if (!searchCountry.trim()) {
    return trips;
  }
  return trips.filter((trip) =>
    trip.country.toLowerCase().includes(searchCountry.toLowerCase()),
  );
};
export const selectTripsCount = (state: { trips: TripsState }) =>
  state.trips.trips.length;

export default tripsSlice.reducer;
