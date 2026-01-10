import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Performance optimizations for faster builds and HMR
  build: {
    target: 'es2020',
    minify: 'esbuild', // esbuild is default and faster than terser
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React ecosystem
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Separate chunk for animations (framer-motion is large)
          animations: ['framer-motion'],
        }
      }
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
  },

  // Dev server optimizations
  server: {
    hmr: {
      overlay: true,
    },
  },

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['lucide-react', 'framer-motion'],
  },

  // CSS optimizations
  css: {
    devSourcemap: true,
  },
})
