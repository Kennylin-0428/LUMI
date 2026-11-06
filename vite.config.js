import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import lumiAdmin from './vite-plugin-admin.js';

// base: './' 讓 build 後的 dist 可放在任意子路徑（GitHub Pages 等）
// lumiAdmin：商品後台 API，只在 npm run dev 時啟用
export default defineConfig({
  base: './',
  plugins: [react(), lumiAdmin()],
});
