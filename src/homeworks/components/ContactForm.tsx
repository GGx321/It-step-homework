import { useState, useRef, useEffect } from 'react';
import Block from '../../components/Block';

interface FormData {
  name: string;
  email: string;
  message: string;
  category: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  category?: string;
}

const CATEGORIES = [
  { value: '', label: 'Оберіть категорію' },
  { value: 'питання', label: 'Питання' },
  { value: 'скарга', label: 'Скарга' },
  { value: 'інше', label: 'Інше' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    category: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Автофокус на поле имени при загрузке
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Валидация имени
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Ім'я має містити мінімум 2 символи";
    }

    // Валидация email
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email має містити символ @';
      }
    }

    // Валидация сообщения
    if (!formData.message.trim()) {
      newErrors.message = "Повідомлення є обов'язковим";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Повідомлення має містити мінімум 10 символів';
    }

    // Валидация категории
    if (!formData.category) {
      newErrors.category = 'Оберіть категорію';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработка изменения полей
  const handleInputChange =
    (field: keyof FormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Очистка ошибки при вводе
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Имитация отправки
    setTimeout(() => {
      setSuccessMessage('Повідомлення успішно надіслано');
      setFormData({
        name: '',
        email: '',
        message: '',
        category: '',
      });
      setErrors({});
      setIsSubmitting(false);

      // Фокус на поле имени
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }

      // Убираем сообщение через 3 секунды
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };

  // Очистка формы
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      category: '',
    });
    setErrors({});
    setSuccessMessage('');

    // Фокус на поле имени
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <Block className="block">
        <h2 className="mb-4 text-xl font-bold">
          Домашнє завдання 7: Форма зв'язку
        </h2>
        <p className="text-gray-600">
          Керовані елементи форми з валідацією та UX-покращеннями
        </p>
      </Block>

      {/* Форма */}
      <Block className="block">
        <h3 className="mb-4 text-lg font-semibold">Форма зв'язку</h3>

        {/* Сообщение об успехе */}
        {successMessage && (
          <div className="mb-6 rounded-md border border-green-400 bg-green-100 p-4 text-green-700">
            ✅ {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Поле Ім'я */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Ім'я <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameInputRef}
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange('name')}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введіть ваше ім'я..."
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Поле Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Поле Повідомлення */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Повідомлення <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange('message')}
              rows={4}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Введіть ваше повідомлення..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          {/* Поле Тип запиту */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Тип запиту <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange('category')}
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* Кнопки */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isSubmitting ? 'Надсилання...' : 'Надіслати'}
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="rounded-md bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Очистити форму
            </button>
          </div>
        </form>
      </Block>

      {/* Информация о валидации */}
      <Block className="block border border-blue-200 bg-blue-50">
        <h4 className="mb-2 font-medium text-blue-900">
          📝 Правила валідації:
        </h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>
            • <strong>Ім'я:</strong> Обов'язкове, мін. 2 символи
          </li>
          <li>
            • <strong>Email:</strong> Обов'язкове, має містити @
          </li>
          <li>
            • <strong>Повідомлення:</strong> Обов'язкове, мін. 10 символів
          </li>
          <li>
            • <strong>Тип запиту:</strong> Значення з переліку: "Питання",
            "Скарга", "Інше"
          </li>
        </ul>
      </Block>
    </div>
  );
}
