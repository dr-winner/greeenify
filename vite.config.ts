import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ['@mapbox/node-pre-gyp', 'nock'],
  },
  build: {
    rollupOptions: {
      external: ['@mapbox/node-pre-gyp', 'nock', 'aws-sdk', 'mock-aws-s3'],
    },
  },
  define: {
    // Fix for "global is not defined" error
    global: 'window',
  },
});
