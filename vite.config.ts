import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Замените на нужный порт
    host: true, // Опционально: позволяет доступ извне
  },
});
