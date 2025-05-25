import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // serve para nao dar erro de import nos tests
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node', // ou 'jsdom' se for frontend
  },
});
