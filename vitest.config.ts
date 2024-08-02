import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests_unit__/setupTests.ts'],
    include: ['./src/__tests_unit__/**/*.test.tsx', './src/__tests_unit__/**/*.spec.tsx'],
    alias: {
      '@': './src',
    },
  },
});