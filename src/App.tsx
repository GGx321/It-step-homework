import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Breadcrumbs from './components/Breadcrumbs';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Homeworks from './pages/Homeworks';
import Classes from './pages/Classes';
import homeworks from './homeworks/index';
import './App.css';
import Footer from './components/Footer';

function App() {
  const {
    Homework1,
    Homework2,
    Homework3,
    Homework4,
    Homework5,
    Homework6,
    Homework7,
    Homework8,
    Homework9,
    Homework10,
    Homework11,
    Homework12,
  } = homeworks;
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
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
        <Route path="/homeworks/7" element={<Homework7 />} />
        <Route path="/homeworks/8" element={<Homework8 />} />
        <Route path="/homeworks/9" element={<Homework9 />} />
        <Route path="/homeworks/10" element={<Homework10 />} />
        <Route path="/homeworks/11" element={<Homework11 />} />
        <Route path="/homeworks/12" element={<Homework12 />} />
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
