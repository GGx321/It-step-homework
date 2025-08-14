import React, { useState } from 'react';
import {
  Routes,
  Route,
  NavLink,
  useParams,
  useNavigate,
  Navigate,
  Outlet,
} from 'react-router-dom';
import HomeworkPage from '../components/HomeworkPage';

// Дані про міста
const cities = [
  {
    slug: 'kyiv',
    name: 'Kyiv',
    places: [
      'St. Sophia Cathedral',
      'Andriivskyi Descent',
      'Maidan Nezalezhnosti',
      'Kyiv Pechersk Lavra',
    ],
  },
  {
    slug: 'lviv',
    name: 'Lviv',
    places: [
      'Rynok Square',
      'High Castle',
      'Lviv Opera House',
      'Lychakiv Cemetery',
    ],
  },
  {
    slug: 'odesa',
    name: 'Odesa',
    places: [
      'Potemkin Stairs',
      'Arcadia Beach',
      'Deribasivska Street',
      'Odesa Opera House',
    ],
  },
  {
    slug: 'kharkiv',
    name: 'Kharkiv',
    places: ['Freedom Square', 'Gorky Park', 'Kharkiv Zoo', 'Mirror Stream'],
  },
  {
    slug: 'dnipro',
    name: 'Dnipro',
    places: [
      'Monastyrskyi Island',
      'Menorah',
      'Dnipro River Embankment',
      'Taras Shevchenko Park',
    ],
  },
];

// Стан авторизації
let isLoggedIn = false;

// Компонент навігації
function Navigation({ basePath }: { basePath: string }) {
  return (
    <nav className="mb-8 rounded-lg bg-slate-800 p-4">
      <ul className="m-0 flex list-none gap-8 p-0">
        <li>
          <NavLink
            to={basePath}
            className={({ isActive }) =>
              `rounded px-4 py-2 text-white no-underline transition-colors ${
                isActive
                  ? 'bg-blue-500/20 font-bold text-blue-400'
                  : 'hover:bg-slate-700'
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${basePath}/cities`}
            className={({ isActive }) =>
              `rounded px-4 py-2 text-white no-underline transition-colors ${
                isActive
                  ? 'bg-blue-500/20 font-bold text-blue-400'
                  : 'hover:bg-slate-700'
              }`
            }
          >
            Cities
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${basePath}/about`}
            className={({ isActive }) =>
              `rounded px-4 py-2 text-white no-underline transition-colors ${
                isActive
                  ? 'bg-blue-500/20 font-bold text-blue-400'
                  : 'hover:bg-slate-700'
              }`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${basePath}/login`}
            className={({ isActive }) =>
              `rounded px-4 py-2 text-white no-underline transition-colors ${
                isActive
                  ? 'bg-blue-500/20 font-bold text-blue-400'
                  : 'hover:bg-slate-700'
              }`
            }
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

// Головна сторінка
function HomePage({ basePath }: { basePath: string }) {
  return (
    <div className="p-8 text-center">
      <h1 className="mb-4 text-4xl font-bold text-slate-800">
        Welcome to Cities Explorer
      </h1>
      <p className="mb-8 text-xl text-slate-600">
        Discover amazing cities and their fascinating places. Navigate through
        different locations and explore what each city has to offer.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <NavLink
          to={`${basePath}/cities`}
          className="rounded-lg bg-blue-500 px-8 py-4 font-bold text-white no-underline transition-colors hover:bg-blue-600"
        >
          Explore Cities
        </NavLink>
        <NavLink
          to={`${basePath}/about`}
          className="rounded-lg bg-red-500 px-8 py-4 font-bold text-white no-underline transition-colors hover:bg-red-600"
        >
          About Project
        </NavLink>
      </div>
    </div>
  );
}

// Список міст
function CitiesPage({ basePath }: { basePath: string }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8">
      <h1 className="mb-8 text-4xl font-bold text-slate-800">Cities</h1>

      {/* Пошук */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 rounded-lg border-2 border-slate-300 p-3 text-lg outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCities.map((city) => (
          <div
            key={city.slug}
            className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-lg transition-transform hover:scale-105"
          >
            <h3 className="mb-4 text-2xl font-bold text-slate-800">
              {city.name}
            </h3>
            <p className="mb-6 text-slate-600">
              {city.places.length} interesting places to visit
            </p>
            <NavLink
              to={`${basePath}/cities/${city.slug}`}
              className="inline-block rounded-md bg-green-500 px-6 py-3 font-bold text-white no-underline transition-colors hover:bg-green-600"
            >
              View Details
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

// Детальна сторінка міста
function CityDetailPage({ basePath }: { basePath: string }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    return <Navigate to={`${basePath}/404`} replace />;
  }

  const currentIndex = cities.findIndex((c) => c.slug === slug);
  const prevCity = currentIndex > 0 ? cities[currentIndex - 1] : null;
  const nextCity =
    currentIndex < cities.length - 1 ? cities[currentIndex + 1] : null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(`${basePath}/cities`)}
          className="mb-4 rounded-md bg-slate-500 px-6 py-3 text-white transition-colors hover:bg-slate-600"
        >
          ← Back to Cities
        </button>
      </div>

      <h1 className="mb-4 text-4xl font-bold text-slate-800">{city.name}</h1>
      <p className="mb-8 text-xl text-slate-600">
        Discover the amazing places in {city.name}
      </p>

      {/* Навігація між містами */}
      <div className="mb-8 flex gap-4">
        {prevCity && (
          <button
            onClick={() => navigate(`${basePath}/cities/${prevCity.slug}`)}
            className="rounded-md bg-orange-500 px-6 py-3 text-white transition-colors hover:bg-orange-600"
          >
            ← {prevCity.name}
          </button>
        )}
        {nextCity && (
          <button
            onClick={() => navigate(`${basePath}/cities/${nextCity.slug}`)}
            className="rounded-md bg-orange-500 px-6 py-3 text-white transition-colors hover:bg-orange-600"
          >
            {nextCity.name} →
          </button>
        )}
      </div>

      {/* Вкладений маршрут для локацій */}
      <div className="mt-8">
        <h2 className="mb-4 text-3xl font-bold text-slate-800">
          Places in {city.name}
        </h2>
        <NavLink
          to={`${basePath}/cities/${slug}/places`}
          className="mb-8 inline-block rounded-lg bg-purple-500 px-8 py-4 font-bold text-white no-underline transition-colors hover:bg-purple-600"
        >
          View All Places
        </NavLink>

        <Outlet />
      </div>
    </div>
  );
}

// Список локацій міста
function CityPlacesPage() {
  const { slug } = useParams();
  const city = cities.find((c) => c.slug === slug);

  if (!city) {
    return <Navigate to="/homeworks/13/404" replace />;
  }

  // Перевірка авторизації
  if (!isLoggedIn) {
    return <Navigate to="/homeworks/13/login" replace />;
  }

  return (
    <div className="mt-8">
      <h3 className="mb-6 text-2xl font-bold text-slate-800">
        Interesting Places in {city.name}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {city.places.map((place, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-300 bg-gray-50 p-4"
          >
            <h4 className="mb-2 text-lg font-semibold text-slate-800">
              {place}
            </h4>
            <p className="text-sm text-slate-600">
              A must-visit location in {city.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Сторінка "Про проєкт"
function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-4xl font-bold text-slate-800">
        About the Project
      </h1>
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-3xl font-bold text-slate-700">
          Cities Explorer
        </h2>
        <p className="mb-4 leading-relaxed text-slate-600">
          This is a mini-website showcasing cities and their interesting
          locations. The project demonstrates various React Router features
          including:
        </p>
        <ul className="mb-6 list-disc space-y-2 pl-6 leading-relaxed text-slate-600">
          <li>Basic routing with BrowserRouter, Routes, and Route</li>
          <li>Dynamic routes with parameters using useParams()</li>
          <li>Nested routes with Outlet</li>
          <li>Navigation using NavLink and useNavigate()</li>
          <li>Redirects using Navigate</li>
          <li>Search functionality for cities</li>
          <li>Navigation between cities</li>
        </ul>
        <p className="leading-relaxed text-slate-600">
          The project includes 5 Ukrainian cities: Kyiv, Lviv, Odesa, Kharkiv,
          and Dnipro, each with their unique attractions and places of interest.
        </p>
      </div>
    </div>
  );
}

// Сторінка логіну
function LoginPage({ basePath }: { basePath: string }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      isLoggedIn = true;
      navigate(`${basePath}/cities`);
    }
  };

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-slate-800">
        Login
      </h1>
      <form
        onSubmit={handleLogin}
        className="rounded-xl bg-white p-8 shadow-lg"
      >
        <div className="mb-6">
          <label className="mb-2 block font-medium text-slate-800">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border-2 border-slate-300 p-3 text-lg outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-8">
          <label className="mb-2 block font-medium text-slate-800">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border-2 border-slate-300 p-3 text-lg outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-6 py-4 font-bold text-white transition-colors hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-slate-600">
          Use any username and password to login
        </p>
      </form>
    </div>
  );
}

// Сторінка 404
function NotFoundPage({ basePath }: { basePath: string }) {
  return (
    <div className="mx-auto max-w-2xl px-8 py-16 text-center">
      <h1 className="mb-4 text-8xl font-bold text-red-500">404</h1>
      <h2 className="mb-4 text-3xl font-bold text-slate-800">Page Not Found</h2>
      <p className="mb-8 text-xl text-slate-600">
        The page you're looking for doesn't exist.
      </p>
      <NavLink
        to={basePath}
        className="rounded-lg bg-blue-500 px-8 py-4 text-xl font-bold text-white no-underline transition-colors hover:bg-blue-600"
      >
        Go Home
      </NavLink>
    </div>
  );
}

// Головний компонент з маршрутизацією
function CitiesApp() {
  // Отримуємо базовий шлях для домашнього завдання 13
  const basePath = '/homeworks/13';

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation basePath={basePath} />
      <Routes>
        <Route index element={<HomePage basePath={basePath} />} />
        <Route path="cities" element={<CitiesPage basePath={basePath} />} />
        <Route
          path="cities/:slug"
          element={<CityDetailPage basePath={basePath} />}
        >
          <Route path="places" element={<CityPlacesPage />} />
        </Route>
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage basePath={basePath} />} />
        <Route path="404" element={<NotFoundPage basePath={basePath} />} />
        <Route path="*" element={<Navigate to="404" replace />} />
      </Routes>
    </div>
  );
}

export default function Homework13() {
  return (
    <HomeworkPage>
      <CitiesApp />
    </HomeworkPage>
  );
}
