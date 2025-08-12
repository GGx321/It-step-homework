import HomeworkPage from '../components/HomeworkPage';
import RegistrationForm from './components/RegistrationForm';
import EventPlanner from './components/EventPlanner';
import StarRating from './components/StarRating';
import TipCalculator from './components/TipCalculator';

export default function Homework4() {
  return (
    <HomeworkPage>
      <RegistrationForm />

      <EventPlanner />
      <StarRating />
      <TipCalculator />
    </HomeworkPage>
  );
}
