import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Проверка имени
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    }

    // Проверка email
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введіть коректний email';
    }

    // Проверка пароля
    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль має бути не менше 6 символів';
    }

    // Проверка подтверждения пароля
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Підтвердження пароля є обов'язковим";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Паролі не збігаються';
    }

    // Проверка согласия с условиями
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Необхідно прийняти умови';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmittedData(formData);
      setIsSubmitted(true);
      // Очистка формы после успешной отправки
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
      });
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Очистка ошибки при вводе
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-gray-800">
        Завдання 1-2: Форма реєстрації з підтвердженням пароля
      </h3>

      {/* Успешная отправка */}
      {isSubmitted && submittedData && (
        <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-4">
          <h4 className="mb-2 font-medium text-green-800">
            ✅ Реєстрація успішна!
          </h4>
          <div className="space-y-1 text-green-700">
            <p>
              <strong>Ім'я:</strong> {submittedData.name}
            </p>
            <p>
              <strong>Email:</strong> {submittedData.email}
            </p>
            <p>
              <strong>Пароль:</strong>{' '}
              {'•'.repeat(submittedData.password.length)}
            </p>
          </div>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-3 text-sm text-green-600 underline hover:text-green-800"
          >
            Зареєструвати іншого користувача
          </button>
        </div>
      )}

      {/* Форма */}
      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Имя */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Ім'я *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                errors.name
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Введіть ваше ім'я"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                errors.email
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Пароль */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Пароль *
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                errors.password
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Мінімум 6 символів"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Подтверждение пароля */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Підтвердження пароля *
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange('confirmPassword', e.target.value)
              }
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                errors.confirmPassword
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Повторіть пароль"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Checkbox согласия */}
          <div>
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  handleInputChange('agreeToTerms', e.target.checked)
                }
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Я приймаю{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  умови користування
                </a>{' '}
                *
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={!formData.agreeToTerms}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Зареєструватися
          </button>
        </form>
      )}
    </div>
  );
}
