import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://estate-service.onrender.com',
        changeOrigin: true,
        secure: false,
        timeout: 5000,
        proxyTimeout: 5000,
      },
    },
  },

  plugins: [react()],
});