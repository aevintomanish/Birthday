import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  base: './', // Critical for correct relative asset paths
  plugins: [react()],
  build: {
    outDir: 'dist', // Explicit output directory
    assetsDir: 'assets', // Organized asset folder
    emptyOutDir: true, // Clear dist/ before rebuild
    rollupOptions: {
      output: {
        assetFileNames: 'assets/index-kT9rEqO7.css', // Consistent asset naming
        entryFileNames: 'assets/index-BPFS9xsT.js' // Consistent JS naming
      }
    }
  },
  server: {
    port: 3000 // Optional: Set dev server port
  }
});