import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('/react-is/')) {
              return 'vendor-react';
            }
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
          }
        }
      }
    }
  },
  server: {
    proxy: {
      '/api/tracksheets': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/api/archive': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/api/c1-solutions': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/api/youtube': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
      '/api/commentary': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
