import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Скроллим наверх при изменении пути
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Компонент ничего не рендерит
}
