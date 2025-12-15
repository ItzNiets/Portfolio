import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This ensures assets are linked relatively (e.g., "./style.css" instead of "/style.css")
  // allowing the site to work on GitHub Pages subdirectories.
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  publicDir: 'public', // Files in this folder will be served at the root
});