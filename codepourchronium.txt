import { test, expect, chromium } from '@playwright/test';

test('test', async ({ page }) => {
  const browser = await chromium.launch({ headless: false, browserName: 'chromium'});
  const context = await browser.newContext({
    recordVideo: { dir: 'videos/' }, // Directory for video recordings
  });

  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mudiay@yahoo.ca');
  await page.getByRole('textbox', { name: 'Mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('12345678');
  await page.locator('#loginModal').getByRole('button', { name: 'Se connecter' }).click();
  await page.getByRole('textbox', { name: 'Ajoutez une tache' }).click();
  await page.getByRole('textbox', { name: 'Ajoutez une tache' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Ajoutez une tache' }).fill('G');
  await page.getByRole('textbox', { name: 'Ajoutez une tache' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Ajoutez une tache' }).fill('Gym a 18h');
  await page.getByRole('button', { name: 'Ajouter' }).click();
  await page.getByRole('button', { name: 'Se déconnecter' }).click();
  
  await browser.close();
});