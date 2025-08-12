import { useState } from 'react';

export default function TextUppercase() {
  const [text, setText] = useState('');

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Завдання 3: Переведення тексту у ВЕЛИКІ літери
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="text-input"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Введіть текст:
          </label>
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Напишіть щось тут..."
            rows={3}
            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {text && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Результат у ВЕЛИКИХ ЛІТЕРАХ:
            </label>
            <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
              <p className="font-medium text-gray-800">{text.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
