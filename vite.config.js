import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' 讓 build 後的 dist 可放在任意子路徑（GitHub Pages 等）
export default defineConfig({
  base: './',
  plugins: [react()],
});
