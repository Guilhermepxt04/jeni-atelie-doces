import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  // imagetools gera versões em webp de cada foto (ex.: foto.jpg?w=640;1200&format=webp&as=metadata)
  plugins: [react(), tailwindcss(), imagetools()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lenis', '@phosphor-icons/react'],
  },
})
