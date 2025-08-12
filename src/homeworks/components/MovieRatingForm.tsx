import { useState } from 'react';
import Block from '../../components/Block';
import MovieSelect from './MovieSelect';
import RatingInput from './RatingInput';
import CommentInput from './CommentInput';
import SummaryDisplay from './SummaryDisplay';

export default function MovieRatingForm() {
  // Состояние формы в родительском компоненте
  const [movieTitle, setMovieTitle] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  // Валидация формы
  const isFormValid = movieTitle && rating > 1 && comment.length >= 10;

  // Очистка формы
  const handleClear = () => {
    setMovieTitle('');
    setRating(1);
    setComment('');
  };

  // Отправка формы
  const handleSubmit = () => {
    if (!isFormValid) {
      alert('Будь ласка, заповніть всі поля коректно');
      return;
    }

    const formData = {
      movieTitle,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };

    console.log('📊 Дані форми:', formData);
    alert('Оцінка успішно надіслана! Дивіться консоль для деталей.');
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <Block isBlock>
        <h2 className="mb-4 text-xl font-bold">
          Домашнє завдання 8: Передача даних між компонентами
        </h2>
        <p className="text-gray-600">
          Форма оцінки фільмів з передачею даних "знизу вверх" через props
        </p>
      </Block>

      {/* Основная форма */}
      <Block isBlock>
        <h3 className="mb-6 text-lg font-semibold">🎬 Форма оцінки фільму</h3>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Левая колонка - поля ввода */}
          <div className="space-y-6">
            {/* Выбор фильма */}
            <MovieSelect value={movieTitle} onChange={setMovieTitle} />

            {/* Ввод рейтинга */}
            <RatingInput value={rating} onChange={setRating} />

            {/* Ввод комментария */}
            <CommentInput value={comment} onChange={setComment} />

            {/* Кнопки управления */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Надіслати оцінку
              </button>

              <button
                onClick={handleClear}
                className="rounded-md bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600"
              >
                Очистити
              </button>
            </div>
          </div>

          {/* Правая колонка - отображение данных */}
          <div>
            <SummaryDisplay
              movieTitle={movieTitle}
              rating={rating}
              comment={comment}
            />
          </div>
        </div>
      </Block>

      {/* Информация о компонентах */}
      <Block className="block border border-purple-200 bg-purple-50">
        <h4 className="mb-2 font-medium text-purple-900">
          🧩 Архітектура компонентів:
        </h4>
        <ul className="space-y-1 text-sm text-purple-800">
          <li>
            • <strong>MovieRatingForm</strong> — батьківський компонент зі
            станом
          </li>
          <li>
            • <strong>MovieSelect</strong> — вибір фільму через select
          </li>
          <li>
            • <strong>RatingInput</strong> — оцінка через range slider
          </li>
          <li>
            • <strong>CommentInput</strong> — текстова область з валідацією
          </li>
          <li>
            • <strong>SummaryDisplay</strong> — підсумок усіх даних
          </li>
        </ul>
      </Block>

      {/* UX особенности */}
      <Block className="block border border-green-200 bg-green-50">
        <h4 className="mb-2 font-medium text-green-900">
          ✨ Особливості реалізації:
        </h4>
        <ul className="space-y-1 text-sm text-green-800">
          <li>
            • Однонаправлений потік даних: стан → props → зворотні виклики
          </li>
          <li>• Валідація: мінімум 10 символів для коментаря</li>
          <li>• Візуальні індикатори: емодзі для рейтингу, кольори</li>
          <li>• Реактивне відображення: підсумок оновлюється миттєво</li>
          <li>• Консольний вивід при відправці для перевірки</li>
        </ul>
      </Block>
    </div>
  );
}
