import PageShell from '../components/PageShell';
import HomeworkCard from '../components/HomeworkCard';
import { getAllClasses } from '../utils/classesConfig';

export default function Classes() {
  const classes = getAllClasses();

  return (
    <PageShell>
      <div>
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          Классная работа
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Тут будет список классных работ начиная с 12 августа. Работы будут
          подписаны как в Microsoft Teams.
        </p>

        <div className="space-y-4">
          {classes.map((classItem) => (
            <HomeworkCard
              key={classItem.id}
              title={classItem.title}
              description={classItem.description}
              date={classItem.date}
              to={classItem.path}
              tags={classItem.tags}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
