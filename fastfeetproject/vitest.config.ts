import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import swc from 'unplugin-swc';

export default defineConfig({
  // serve para nao dar erro de import nos tests
  plugins: [tsconfigPaths(),
    swc.vite({
      module : {type : 'es6'}
    })
  ],
  test: {
    globals: true,
    environment: 'node', // ou 'jsdom' se for frontend,
    root : './'
  },
});
