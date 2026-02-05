import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname),
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@ciscode/template-fe': resolve(__dirname, '../src'),
    },
  },
});
