import { useState } from 'react';

interface Event {
  id: number;
  name: string;
  date: string;
}

export default function EventPlanner() {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [nextId, setNextId] = useState(1);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();

    if (eventName.trim() && eventDate) {
      const newEvent: Event = {
        id: nextId,
        name: eventName.trim(),
        date: eventDate,
      };

      setEvents((prev) => [...prev, newEvent]);
      setEventName('');
      setEventDate('');
      setNextId((prev) => prev + 1);
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Сортируем события по дате
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <div className="rounded-lg border-2 border-gray-300 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-gray-800">
        Завдання 1: Планувальник подій
      </h3>

      {/* Форма добавления события */}
      <form onSubmit={handleAddEvent} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="eventName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Назва події
            </label>
            <input
              type="text"
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="Наприклад: Прогулянка з другом"
              required
            />
          </div>

          <div>
            <label
              htmlFor="eventDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Дата події
            </label>
            <input
              type="date"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
        >
          Додати подію
        </button>
      </form>

      {/* Список событий */}
      <div>
        <h4 className="text-md mb-3 font-medium text-gray-800">
          📅 Заплановані події ({events.length})
        </h4>

        {events.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p className="mb-2">🗓️</p>
            <p>Поки що немає запланованих подій</p>
            <p className="text-sm">Додайте першу подію вище!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div>
                  <span className="font-mono font-medium text-blue-600">
                    {formatDate(event.date)}
                  </span>
                  <span className="mx-2 text-gray-400">—</span>
                  <span className="text-gray-800">{event.name}</span>
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="ml-2 rounded p-1 text-red-500 transition-colors hover:text-red-700 focus:outline-none"
                  title="Видалити подію"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
