import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs, so the build works from any path: GitHub Pages
  // (/ZodiacProfile/), a custom domain root, or a local preview.
  base: './',
  plugins: [react()],
})
