import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keep CSS exactly as written: the minifier drops unprefixed backdrop-filter.
  build: { assetsDir: '_app', cssMinify: false },
});
