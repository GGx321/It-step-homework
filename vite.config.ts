import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Якщо команда 'serve' (yarn dev), то базовий шлях '/'
  // Якщо команда 'build' (yarn build), то базовий шлях '/It-step-homework/'
  const base = command === 'serve' ? '/' : '/It-step-homework/';

  return {
    plugins: [react()],
    base: base,
    server: {
      port: 3000, // Замените на нужный порт
      host: true, // Опционально: позволяет доступ извне
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  };
});
