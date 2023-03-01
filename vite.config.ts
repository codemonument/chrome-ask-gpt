// vite.config.ts
import { defineConfig } from 'vite'

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
  }
})