// vite.config.ts
import { defineConfig } from 'vite';
import watchAndRun from 'vite-plugin-watch-and-run';
import { resolve } from 'node:path';

export default defineConfig({
  publicDir: './src/public',
  build: {
    outDir: 'dist',
    assetsDir: '',
    emptyOutDir: true,
    lib: {
      entry: 'src/background.js',
      name: 'BackgroundServiceWorker',
      fileName: 'background',
      formats: ['es']
    },
    rollupOptions: {
      input: {
        options: './src/options.html',
        // app: 'src/app.js',
        // admin: 'src/admin.js'
      }
    }
  },
  plugins: [
    // NOTE: This watchAndRun task does only run with `vite dev`, not with `vite build --watch`!
    // Config Docs: https://www.kitql.dev/docs/setup/03_vite-plugin-watch-and-run
    // FIXME: This watchAndRun copies correctly after a change happened, but doesn't do it on startup!
    watchAndRun(
      [
        {
          name: 'copy',
          watchKind: ['add', 'change', 'ready'],
          watch: resolve('./src/public/manifest.json'),
          run: 'npm run copy-manifest',
          delay: 200
        }
      ]
    )
  ]
})