import { defineConfig, devices } from '@playwright/test';
// import globalSetup from './src/__tests_e2e__/global-setup'; 

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/__tests_e2e__',
  reporter: 'html',
  timeout: 3840000, // Tempo máximo para cada teste
  use: {
    baseURL: 'http://localhost:3000', // URL base para os testes
    headless: true, // Executa o navegador em modo headless
    trace: 'on', // Ativa o rastreamento para depuração
  },

  projects: [
    {
      name: 'googlechrome',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  // globalSetup
});
