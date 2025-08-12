import PageShell from '../components/PageShell';
import HomeworkCard from '../components/HomeworkCard';
import { getAllHomeworks } from '../utils/homeworksConfig';

export default function Homeworks() {
  const homeworks = getAllHomeworks();

  return (
    <PageShell>
      <div>
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          Домашние задания
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Тут будет список домашек начиная с 12 августа. Домашки будут подписаны
          как на сайте IT-Step.
        </p>

        <div className="space-y-4">
          {homeworks.map((homework) => (
            <HomeworkCard
              key={homework.id}
              title={homework.title}
              description={homework.description}
              to={homework.path}
              tags={homework.tags}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
