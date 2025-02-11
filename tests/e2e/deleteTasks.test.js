import { test, expect } from '@playwright/test';

test('Effacer une tache', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 🔹 Connexion
    await page.getByRole('button', { name: 'Se connecter' }).click();
    await page.fill('#loginEmail', 'mudiay@yahoo.ca');
    await page.fill('#loginPassword', '12345678');
    await page.locator('#loginModal').getByRole('button', { name: 'Se connecter' }).click();

    // 🔹 Attendre que la liste de tâches apparaisse
    await page.waitForSelector('#taskList li');

    // 🔹 Vérifier le nombre de tâches avant suppression
    const taskCount = await page.locator('#taskList li').count();
    console.log(`Nombre de tâches avant suppression: ${taskCount}`);

    if (taskCount > 0) {
        // Sélectionner la première tâche et cliquer sur le bouton "Effacer"
        await page.locator('#taskList li').first().locator('.delete').click();

        // Attendre la mise à jour de la liste
        await page.waitForTimeout(1000); // Petit délai pour la mise à jour

        // Vérifier que la tâche a bien été supprimée
        const newTaskCount = await page.locator('#taskList li').count();
        expect(newTaskCount).toBe(taskCount - 1);
    } else {
        console.log("Aucune tâche à supprimer.");
    }

    // 🔹 Se déconnecter
    await page.getByRole('button', { name: 'Se déconnecter' }).click();
});
