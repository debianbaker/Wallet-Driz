import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  build: {
    target: 'esnext'  // Use the latest JavaScript features, including top-level await
  }
})
