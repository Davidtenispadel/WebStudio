import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  esbuild: {
    target: 'es2020', // Asegura compatibilidad con 'as const' y otras características modernas
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
