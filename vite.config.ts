import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173,    
    allowedHosts: ['goyoungafrica.org']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': process.env,
  },
  build: {
    outDir: 'dist',
  },
  server: {
    cors: {
      origin: ['https://goyoungafrica.org', 'https://www.goyoungafrica.org', 'www.goyoungafrica.org', 'http://localhost']
    }
  }
})
