// vite.config.ts
import { defineConfig } from 'vite';
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  // Note: Problem with public dir: does not watch it's contents after starting `vite build --watch`
  // publicDir: './src/public',
  build: {
    outDir: 'dist',
    assetsDir: '',
    emptyOutDir: true,
    lib: {
      entry: 'src/background.ts',
      name: 'BackgroundServiceWorker',
      fileName: 'background',
      formats: ['es']
    },
    rollupOptions: {
      // input: {
      //   options: './src/options.html',
      //   // app: 'src/app.js',
      //   // admin: 'src/admin.js'
      // },
    },
    // Note: Not helpful, since it can only limit the watching to files already in the watch graph, 
    // but manifest.json is not in the watchgraph normally
    // watch: {
    //   include: ['./src/manifest.json']
    // }
  },
  plugins: [
    // Note: Works in `vite build --watch` mode, but only directly after start, does not watch the asset!
    // Note 2: Works correctly when using `import './manifest.json';` in background.js (or any other src file transformed by vite)
    viteStaticCopy({
      targets: [{
        src: './src/manifest.json',
        dest: '.'
      }]
    }),
    // Note: This watchAndRun task does only run with `vite dev`, not with `vite build --watch`!
    // Config Docs: https://www.kitql.dev/docs/setup/03_vite-plugin-watch-and-run
    // FIXME: This watchAndRun copies correctly after a change happened, but doesn't do it on startup!
    // watchAndRun(
    //   [
    //     {
    //       name: 'copy',
    //       watchKind: ['add', 'change', 'ready'],
    //       watch: resolve('./src/public/manifest.json'),
    //       run: 'npm run copy-manifest',
    //       delay: 200
    //     }
    //   ]
    // )
  ]
})