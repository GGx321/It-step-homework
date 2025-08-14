import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

// Визначаємо basename залежно від середовища
// Для локальної розробки (yarn dev) - без базового шляху
// Для production (GitHub Pages) - з базовим шляхом
const basename = import.meta.env.DEV ? '' : '/It-step-homework';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
