import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e', // liens des tests playwright dans le document
  testMatch: '**/*.test.js', // tous les tests avec extensions .test.js dans mon dossier
  webServer: {
    command: 'npm start', // demarrer le serveur avant les tests
    port: 3000, // serveur roule sur localhost 3000
   reuseExistingServer: true, //  Ne redémarre pas si un serveur tourne déjà
  },
  use: { // mettre cette partie pour que chronium passe
    headless: false, // Run tests in headless mode
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
  },
});