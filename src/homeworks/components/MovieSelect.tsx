interface MovieSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const MOVIES = [
  { value: '', label: 'Оберіть фільм' },
  { value: 'inception', label: 'Inception' },
  { value: 'titanic', label: 'Titanic' },
  { value: 'matrix', label: 'Matrix' },
  { value: 'interstellar', label: 'Interstellar' },
  { value: 'avatar', label: 'Avatar' },
  { value: 'joker', label: 'Joker' },
  { value: 'avengers', label: 'Avengers: Endgame' },
];

export default function MovieSelect({ value, onChange }: MovieSelectProps) {
  return (
    <div>
      <label
        htmlFor="movie-select"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Назва фільму <span className="text-red-500">*</span>
      </label>
      <select
        id="movie-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {MOVIES.map((movie) => (
          <option key={movie.value} value={movie.value}>
            {movie.label}
          </option>
        ))}
      </select>
    </div>
  );
}
