import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './pages/Home';
import Homeworks from './pages/Homeworks';
import Classes from './pages/Classes';
import homeworks from './homeworks/index';
import './App.css';
import Footer from './components/Footer';

function App() {
  const { Homework1, Homework2, Homework3, Homework4, Homework5, Homework6 } =
    homeworks;
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homeworks" element={<Homeworks />} />
        <Route path="/homeworks/1" element={<Homework1 />} />
        <Route path="/homeworks/2" element={<Homework2 />} />
        <Route path="/homeworks/3" element={<Homework3 />} />
        <Route path="/homeworks/4" element={<Homework4 />} />
        <Route path="/homeworks/5" element={<Homework5 />} />
        <Route path="/homeworks/6" element={<Homework6 />} />
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
      <Footer />
    </div>
  );
}

export default App;
