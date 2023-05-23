import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
import nodePolyfills from 'vite-plugin-node-stdlib-browser'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills()
  ],
  resolve: {
    alias: {
      '@types': path.resolve(__dirname, './src/types'),
    }
  },
  define: {
    'process.env': {},
    global: {}
  },
  
})
