import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Solo en desarrollo: Vite no ejecuta PHP, así que `/api/contact.php` (el
 * script que envía el formulario de contacto en el hosting) se simula. Muestra
 * la consulta en la consola de Vite y responde como el servidor real, sin
 * enviar ningún correo. Para probar el aviso de error, escribe «fallo» como
 * nombre: entonces responde 500, como si el servidor no hubiera podido enviarlo.
 */
const fakeContactEndpoint = (): Plugin => ({
  name: 'fake-contact-endpoint',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/contact.php', (request, response) => {
      let raw = '';
      request.on('data', (chunk) => {
        raw += chunk;
      });
      request.on('end', () => {
        const data = JSON.parse(raw || '{}');
        const fail = data.name === 'fallo';
        console.log('[contact.php simulado]', JSON.stringify(data, null, 2));
        response.statusCode = fail ? 500 : 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(fail ? { ok: false, error: 'mail' } : { ok: true }));
      });
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fakeContactEndpoint()],
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
