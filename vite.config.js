import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Sub-folder the site is served from. '/' for Vercel, Netlify or a custom
  // domain; the GitHub Pages workflow sets BASE_PATH=/webros-website/.
  base: process.env.BASE_PATH || '/',
})
