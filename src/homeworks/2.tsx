import HomeworkPage from '../components/HomeworkPage';
import AgeChecker from './components/AgeChecker';
import StepCounter from './components/StepCounter';
import TextUppercase from './components/TextUppercase';
import PasswordToggle from './components/PasswordToggle';
import LikeDislike from './components/LikeDislike';

export default function Homework2() {
  return (
    <HomeworkPage>
      {/* Компонент 1: Проверка совершеннолетия */}
      <AgeChecker />

      {/* Компонент 2: Счетчик с изменяемым шагом */}
      <StepCounter />

      {/* Компонент 3: Преобразование текста в ЗАГЛАВНЫЕ буквы */}
      <TextUppercase />

      {/* Компонент 4: Переключение видимости пароля */}
      <PasswordToggle />

      {/* Компонент 5: Лайки и дизлайки */}
      <LikeDislike />
    </HomeworkPage>
  );
}
