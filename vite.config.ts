// vite.config.ts
import { defineConfig } from 'vite'
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig({
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
        background: 'src/background.js'
        // app: 'src/app.js',
        // admin: 'src/admin.js'
      }
    }
  },
  plugins: [
    // Options: https://www.npmjs.com/package/vite-plugin-static-copy
    // Note: dest is relative to build.outDir
    viteStaticCopy({
      targets: [
        { src: './src/manifest.json', dest: '.' }
      ]
    })
  ]
})