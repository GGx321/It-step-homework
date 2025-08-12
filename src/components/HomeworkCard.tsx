import { Link } from 'react-router-dom';

interface HomeworkCardProps {
  title: string;
  description: string;
  date?: string;
  to: string;
  tags: string[];
}

export default function HomeworkCard({
  title,
  description,
  date,
  to,
  tags,
}: HomeworkCardProps) {
  // Цвета для тегов
  const tagColors = [
    'bg-blue-100 text-blue-800',
    'bg-green-100 text-green-800',
    'bg-purple-100 text-purple-800',
    'bg-orange-100 text-orange-800',
    'bg-red-100 text-red-800',
    'bg-yellow-100 text-yellow-800',
    'bg-indigo-100 text-indigo-800',
    'bg-pink-100 text-pink-800',
  ];

  return (
    <div className="rounded-lg border-l-4 border-blue-500 bg-white p-6 shadow-md">
      <h2 className="mb-2 text-xl font-semibold">
        <Link
          to={to}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {title}
        </Link>
      </h2>
      <p className="mb-3 text-gray-600">{description}</p>
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={tag}
              className={`rounded px-2 py-1 text-sm ${
                tagColors[index % tagColors.length]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {date ? (
          <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-800">
            {date}
          </span>
        ) : null}
      </div>
    </div>
  );
}
