import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
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
      }
    }
  }
})
