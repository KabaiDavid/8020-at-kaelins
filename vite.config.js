import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Static multi-page build for Cloudflare Pages.
// - index.html and 404.html are entry points (Pages serves 404.html automatically).
// - src/ CSS + JS are bundled, minified and content-hashed into dist/assets/.
// - public/ (images, fonts, favicon, robots, sitemap, _headers) is copied verbatim.
const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2019',
    cssTarget: 'safari14',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        notFound: resolve(root, '404.html'),
      },
    },
  },
});
