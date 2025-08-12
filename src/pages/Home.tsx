import Block from '../components/Block';
import PageShell from '../components/PageShell';

export default function Home() {
  return (
    <PageShell>
      <div>
        <h1 className="mb-6 text-4xl font-bold text-gray-800">
          Главная страница
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Очередной сайт для IT-Step по домашке и классным заданиям
        </p>
        <blockquote className="mb-8 border-l-4 border-indigo-400 bg-indigo-50 p-4 text-gray-700 italic">
          "Честно устал их клепать, но с повышением уровня навыков - делать
          рефакторинг прошлых проектов очень харит. Проще и быстрее наклепать
          новый за пол часа и забыть об этом."
        </blockquote>
      </div>
      <Block className="block">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Возможности:
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-600">
          <li>Роутинг</li>
          <li>Кеширование</li>
          <li>Разные либы</li>
          <li>Чистый код (по возможности)</li>
        </ul>
      </Block>

      <Block className="block">
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          В будущем:
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-gray-600">
          <li>Доработка стилей и логики</li>
          <li>
            Расширение проекта (сейчас занес только базовое так как мне нужно
            сделать 12 домашек за 2 часа)
          </li>
          <li>Развертывание на сервере</li>
        </ul>
      </Block>
    </PageShell>
  );
}
