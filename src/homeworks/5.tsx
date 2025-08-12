import HomeworkPage from '../components/HomeworkPage';
import CountriesList from './components/CountriesList';
import UserSearch from './components/UserSearch';
import BookFilter from './components/BookFilter';

export default function Homework5() {
  return (
    <HomeworkPage>
      {/* Задание 1: Список стран с фильтрацией */}
      <CountriesList />

      {/* Задание 2: Поиск пользователей с debounce */}
      <UserSearch />

      {/* Задание 3: Комбинированная фильтрация книг */}
      <BookFilter />
    </HomeworkPage>
  );
}
