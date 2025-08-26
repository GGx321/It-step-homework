import HomeworkPage from '../components/HomeworkPage';
import UpcomingLaunches from './components/UpcomingLaunches';
import PokemonList from './components/PokemonList';

export default function Homework14() {
  return (
    <HomeworkPage>
      <div className="space-y-8">
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            Завантаження та відображення даних з різних API використовуючи fetch
            та axios
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <UpcomingLaunches />
          <PokemonList />
        </div>
      </div>
    </HomeworkPage>
  );
}
