import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Main library build
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.scss'),
      name: 'FlexaCore',
      fileName: 'flexacore'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },

  // Development server
  server: {
    port: 3000,
    open: true
  },

  // CSS processing
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${resolve(__dirname, 'src/base/_variables.scss')}";`
      }
    }
  },

  // Alias for imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utilities': resolve(__dirname, 'src/utilities'),
      '@themes': resolve(__dirname, 'src/themes'),
      '@layout': resolve(__dirname, 'src/layout')
    }
  },

  // Demo site configuration
  plugins: [
    {
      name: 'demo-site',
      config(config, { command }) {
        if (command === 'serve' && process.env.DEMO) {
          return {
            root: 'demo',
            publicDir: 'demo/public',
            build: {
              outDir: 'dist-demo'
            }
          }
        }
      }
    }
  ],

  // Optimizations
  optimizeDeps: {
    include: []
  },

  // Build optimizations
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          utilities: ['./src/utilities'],
          components: ['./src/components'],
          themes: ['./src/themes']
        }
      }
    }
  }
}) 