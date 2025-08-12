import { useState, useMemo, useEffect } from 'react';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Валидация в useEffect
  useEffect(() => {
    const newErrors: Record<string, string> = {};

    // Проверка суммы счета
    if (billAmount && billAmount.trim()) {
      const billValue = parseFloat(billAmount);
      if (isNaN(billValue) || billValue <= 0) {
        newErrors.billAmount = 'Введіть коректну суму (більше 0)';
      }
    }

    // Проверка процента чаевых
    if (tipPercentage && tipPercentage.trim()) {
      const tipValue = parseFloat(tipPercentage);
      if (isNaN(tipValue) || tipValue < 0) {
        newErrors.tipPercentage = 'Введіть коректний відсоток (0 або більше)';
      }
    }

    // Проверка количества людей
    if (numberOfPeople && numberOfPeople.trim()) {
      const peopleValue = parseInt(numberOfPeople);
      if (isNaN(peopleValue) || peopleValue < 1) {
        newErrors.numberOfPeople = 'Кількість людей має бути не менше 1';
      }
    }

    setErrors(newErrors);
  }, [billAmount, tipPercentage, numberOfPeople]);

  // Мемоизируем расчет
  const calculation = useMemo(() => {
    // Проверяем, что все поля заполнены и нет ошибок
    if (
      !billAmount ||
      !tipPercentage ||
      !numberOfPeople ||
      Object.keys(errors).length > 0
    ) {
      return null;
    }

    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numberOfPeople);

    // Дополнительная проверка на корректность значений
    if (
      isNaN(bill) ||
      bill <= 0 ||
      isNaN(tip) ||
      tip < 0 ||
      isNaN(people) ||
      people < 1
    ) {
      return null;
    }

    const tipAmount = (bill * tip) / 100;
    const totalAmount = bill + tipAmount;
    const perPersonAmount = totalAmount / people;

    return {
      bill,
      tip,
      people,
      tipAmount,
      totalAmount,
      perPersonAmount,
    };
  }, [billAmount, tipPercentage, numberOfPeople, errors]);

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'billAmount':
        setBillAmount(value);
        break;
      case 'tipPercentage':
        setTipPercentage(value);
        break;
      case 'numberOfPeople':
        setNumberOfPeople(value);
        break;
    }
  };

  const isFormValid =
    billAmount &&
    tipPercentage &&
    numberOfPeople &&
    Object.keys(errors).length === 0;

  // Предустановленные проценты чаевых
  const presetTips = [10, 15, 18, 20, 25];

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-gray-800">
        Завдання 3: Розширений калькулятор чайових
      </h3>

      <div className="space-y-4">
        {/* Сумма счета */}
        <div>
          <label
            htmlFor="billAmount"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Сума рахунку (грн) *
          </label>
          <input
            type="number"
            id="billAmount"
            value={billAmount}
            onChange={(e) => handleInputChange('billAmount', e.target.value)}
            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
              errors.billAmount
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="1000"
            min="0"
            step="0.01"
          />
          {errors.billAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.billAmount}</p>
          )}
        </div>

        {/* Процент чаевых */}
        <div>
          <label
            htmlFor="tipPercentage"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Відсоток чайових (%) *
          </label>
          <input
            type="number"
            id="tipPercentage"
            value={tipPercentage}
            onChange={(e) => handleInputChange('tipPercentage', e.target.value)}
            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
              errors.tipPercentage
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="15"
            min="0"
            step="0.1"
          />
          {errors.tipPercentage && (
            <p className="mt-1 text-sm text-red-600">{errors.tipPercentage}</p>
          )}

          {/* Предустановленные проценты */}
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Швидкий вибір:</span>
            {presetTips.map((preset) => (
              <button
                key={preset}
                onClick={() =>
                  handleInputChange('tipPercentage', preset.toString())
                }
                className="rounded border bg-gray-100 px-2 py-1 text-xs transition-colors hover:bg-gray-200 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                {preset}%
              </button>
            ))}
          </div>
        </div>

        {/* Количество людей */}
        <div>
          <label
            htmlFor="numberOfPeople"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Кількість людей *
          </label>
          <input
            type="number"
            id="numberOfPeople"
            value={numberOfPeople}
            onChange={(e) =>
              handleInputChange('numberOfPeople', e.target.value)
            }
            className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
              errors.numberOfPeople
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder="2"
            min="1"
            step="1"
          />
          {errors.numberOfPeople && (
            <p className="mt-1 text-sm text-red-600">{errors.numberOfPeople}</p>
          )}
        </div>

        {/* Результаты расчета */}
        {isFormValid && calculation && (
          <div className="mt-6 rounded-md border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-3 font-medium text-blue-800">
              💰 Результат розрахунку:
            </h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Сума рахунку:</span>
                <span className="font-medium">
                  {calculation.bill.toFixed(2)} грн
                </span>
              </div>
              <div className="flex justify-between">
                <span>Чайові ({calculation.tip}%):</span>
                <span className="font-medium">
                  {calculation.tipAmount.toFixed(2)} грн
                </span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-2">
                <span>Загальна сума:</span>
                <span className="font-bold">
                  {calculation.totalAmount.toFixed(2)} грн
                </span>
              </div>
              <div className="-mx-2 flex justify-between rounded bg-blue-100 p-2">
                <span className="font-medium">Кожен платить:</span>
                <span className="text-lg font-bold">
                  {calculation.perPersonAmount.toFixed(2)} грн
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Информация */}
        <div className="mt-6 rounded-md bg-gray-50 p-3 text-xs text-gray-500">
          <p className="mb-1">
            💡 <strong>Порада:</strong> В Україні прийнято залишати 10-15%
            чайових за хороший сервіс
          </p>
          <p>
            🧮 <strong>Формула:</strong> (Рахунок + Чайові) ÷ Кількість людей =
            Сума на особу
          </p>
        </div>
      </div>
    </div>
  );
}
