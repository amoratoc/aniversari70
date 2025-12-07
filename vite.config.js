import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// El nombre del repositorio es 'aniversari70'
export const repoName = 'aniversari70'

// https://vite.dev/config/
export default defineConfig({
  base: `/${repoName}/`,
  plugins: [
    react(),
    tailwindcss()],
})
