import HomeworkPage from '../components/HomeworkPage';
import Block from '../components/Block';

export default function Homework12() {
  return (
    <HomeworkPage>
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800">
            React Router
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Этот сайт уже полностью написан на React Router! 🎉
          </p>
        </div>

        <Block isBlock className="space-y-6">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">
              💡 Что уже реализовано:
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">✅</span>
                <span>
                  <strong>Навигация</strong> - компонент Navigation со ссылками
                  на все страницы
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">✅</span>
                <span>
                  <strong>Маршрутизация</strong> - Routes с маршрутами для /,
                  /homeworks, /classes
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">✅</span>
                <span>
                  <strong>Динамические маршруты</strong> - /homeworks/1,
                  /homeworks/2, ... /homeworks/12
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">✅</span>
                <span>
                  <strong>404 страница</strong> - обработка неверных URL
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">✅</span>
                <span>
                  <strong>Breadcrumbs</strong> - навигационные хлебные крошки
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">✅</span>
                <span>
                  <strong>ScrollToTop</strong> - автоматический скролл при смене
                  маршрута
                </span>
              </li>
            </ul>
          </div>

          <Block
            isBlock
            className="rounded-lg border border-blue-200 bg-blue-50 p-4"
          >
            <h3 className="mb-2 font-semibold text-blue-800">
              🏗️ Архитектура:
            </h3>
            <div className="space-y-1 text-sm text-blue-700">
              <p>
                <strong>App.tsx</strong> - главный компонент с Routes
              </p>
              <p>
                <strong>Navigation.tsx</strong> - навигационное меню с Link
                компонентами
              </p>
              <p>
                <strong>Breadcrumbs.tsx</strong> - динамические хлебные крошки с
                useLocation
              </p>
              <p>
                <strong>ScrollToTop.tsx</strong> - хук для скролла при навигации
              </p>
              <p>
                <strong>pages/</strong> - компоненты страниц (Home, Homeworks,
                Classes)
              </p>
              <p>
                <strong>homeworks/</strong> - отдельные компоненты для каждого
                задания
              </p>
            </div>
          </Block>

          <Block
            isBlock
            className="rounded-lg border border-green-200 bg-green-50 p-4"
          >
            <h3 className="mb-2 font-semibold text-green-800">
              🚀 Функционал React Router:
            </h3>
            <div className="space-y-1 text-sm text-green-700">
              <p>
                • <strong>useNavigate</strong> - программная навигация
              </p>
              <p>
                • <strong>useLocation</strong> - получение текущего URL
              </p>
              <p>
                • <strong>useParams</strong> - динамические параметры маршрутов
              </p>
              <p>
                • <strong>Link/NavLink</strong> - декларативная навигация
              </p>
              <p>
                • <strong>Routes/Route</strong> - конфигурация маршрутов
              </p>
            </div>
          </Block>
        </Block>
      </div>
    </HomeworkPage>
  );
}
