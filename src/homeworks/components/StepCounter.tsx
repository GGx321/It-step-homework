import { useState } from 'react';

export default function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => {
    setCount(count + step);
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Завдання 2: Лічильник зі змінним кроком
      </h3>

      <div className="space-y-4">
        <div className="text-center">
          <div className="mb-4 text-3xl font-bold text-blue-600">{count}</div>
        </div>

        <div>
          <label
            htmlFor="step-input"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Крок збільшення:
          </label>
          <input
            id="step-input"
            type="number"
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value) || 1)}
            min="1"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={increment}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Збільшити на {step}
        </button>
      </div>
    </div>
  );
}
