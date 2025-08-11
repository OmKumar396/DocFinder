// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'; // Import the tailwindcss vite plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add the tailwindcss plugin here
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});