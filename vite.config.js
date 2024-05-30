import { defineConfig } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // You can include additional plugins here
    // Add other plugins if needed
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, 
    host: '0.0.0.0', 
  },
  build: {
      outDir: 'dist', 
  },
  
});
