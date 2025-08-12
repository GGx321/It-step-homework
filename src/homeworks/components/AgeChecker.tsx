import { useState } from 'react';

export default function AgeChecker() {
  const [age, setAge] = useState('');

  const getMessage = () => {
    if (age === '') return '';
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber)) return 'Введіть коректний вік';
    return ageNumber >= 18 ? 'Повнолітній' : 'Неповнолітній';
  };

  const getMessageColor = () => {
    if (age === '') return '';
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber)) return 'text-red-500';
    return ageNumber >= 18 ? 'text-green-600' : 'text-orange-600';
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Завдання 1: Перевірка повноліття
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="age-input"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Введіть ваш вік:
          </label>
          <input
            id="age-input"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Наприклад: 25"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {getMessage() && (
          <div className={`font-medium ${getMessageColor()}`}>
            {getMessage()}
          </div>
        )}
      </div>
    </div>
  );
}
