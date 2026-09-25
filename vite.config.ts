import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Garantiza una única copia de React (evita "Invalid hook call").
    dedupe: ['react', 'react-dom'],
    alias: {
      src: '/src',
      components: '/src/components',
      pages: '/src/pages',
      constants: '/src/constants',
      data: '/src/data',
      hooks: '/src/hooks',
      interfaces: '/src/interfaces',
      libs: '/src/libs',
    },
  },
});
