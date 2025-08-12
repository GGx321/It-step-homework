import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/It-step-homework/', // Замените на название вашего репозитория
  server: {
    port: 3000, // Замените на нужный порт
    host: true, // Опционально: позволяет доступ извне
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
