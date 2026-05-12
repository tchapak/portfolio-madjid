import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: { '@': '/src' },
  },

  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three'))
            return 'vendor-three'
          if (id.includes('framer-motion'))
            return 'vendor-motion'
          if (id.includes('/react/') || id.includes('/react-dom/'))
            return 'vendor-react'
        },
      },
    },
  },
})
