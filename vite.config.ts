// vite.config.ts
import { defineConfig } from 'vite';
import watchAndRun from 'vite-plugin-watch-and-run';
import rollupCopy from "rollup-plugin-copy-assets";
import { resolve } from 'node:path';
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  // Note: Problem with public dir: does not watch it's contents after starting `vite build --watch`
  // publicDir: './src/public',
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
      // input: {
      //   options: './src/options.html',
      //   // app: 'src/app.js',
      //   // admin: 'src/admin.js'
      // },
      plugins: [
        // rollupCopy({
        //   assets: [
        //     './src/manifest.json'
        //   ]
        // })
      ]
    },
    // Note: Not helpful, since it can only limit the watching to files already in the watch graph, 
    // but manifest.json is not in the watchgraph normally
    // watch: {
    //   include: ['./src/manifest.json']
    // }
  },
  // CAUTION: Plugins seem ONLY run in `vite dev` server mode!!!
  plugins: [
    // Note: Works in `vite build --watch` mode, but only directly after start, does not watch the asset!
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