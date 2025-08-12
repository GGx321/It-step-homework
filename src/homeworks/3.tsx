import HomeworkPage from '../components/HomeworkPage';
import AutoCounter from './components/AutoCounter';
import TodoList from './components/TodoList';

export default function Homework3() {
  return (
    <HomeworkPage>
      {/* Завдання 1: Автоматичний лічильник */}
      <AutoCounter />

      {/* Завдання 2: TodoList з API */}
      <TodoList />
    </HomeworkPage>
  );
}
