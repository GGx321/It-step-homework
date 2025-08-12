import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './pages/Home';
import Homeworks from './pages/Homeworks';
import Classes from './pages/Classes';
import Homework1 from './homeworks/1';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homeworks" element={<Homeworks />} />
        <Route path="/homeworks/1" element={<Homework1 />} />
        <Route path="/classes" element={<Classes />} />
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-800">404</h1>
                <p className="text-gray-600">Страница не найдена</p>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
