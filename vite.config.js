import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/api-wilayah-indonesia': {
    //     target: 'https://emsifa.github.io',
    //     changeOrigin: true,
    //   },
    // },

    // host: '192.168.100.16',
    // port: '5173',
  },

  plugins: [react()],
})
