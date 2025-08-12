interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function RatingInput({ value, onChange }: RatingInputProps) {
  return (
    <div>
      <label
        htmlFor="rating-input"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Оцінка (1-10) <span className="text-red-500">*</span>
      </label>

      {/* Range slider */}
      <div className="space-y-2">
        <input
          id="rating-input"
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />

        {/* Отображение текущего значения */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>1</span>
          <span className="text-lg font-medium text-blue-600">{value}</span>
          <span>10</span>
        </div>

        {/* Визуальные индикаторы */}
        <div className="flex justify-between text-xs">
          <span>Погано</span>
          <span>Відмінно</span>
        </div>
      </div>
    </div>
  );
}
