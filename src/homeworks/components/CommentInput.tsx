interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CommentInput({ value, onChange }: CommentInputProps) {
  const minLength = 10;
  const isValid = value.length >= minLength;

  return (
    <div>
      <label
        htmlFor="comment-input"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Коментар <span className="text-red-500">*</span>
      </label>
      <textarea
        id="comment-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Поділіться своїми враженнями від фільму..."
        className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          value.length > 0 && !isValid ? 'border-red-500' : 'border-gray-300'
        }`}
      />

      {/* Счетчик символов и валидация */}
      <div className="mt-1 flex justify-between text-sm">
        <span className={`${isValid ? 'text-green-600' : 'text-red-600'}`}>
          {value.length < minLength
            ? `Мінімум ${minLength} символів (залишилось: ${minLength - value.length})`
            : '✓ Достатньо символів'}
        </span>
        <span className="text-gray-500">{value.length}/500</span>
      </div>
    </div>
  );
}
