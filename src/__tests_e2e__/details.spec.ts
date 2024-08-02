import { test, expect } from '@playwright/test';

test('Should Navigate to the character details page and verify the integrity', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('table tbody tr:first-child');

    await page.locator('#loading').waitFor({ state: 'hidden' });

    await expect(page).toHaveURL(/\/details\/\d+/);
    await expect(page.locator('h2', { hasText: 'Histórias em Quadrinhos' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Eventos' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Séries' })).toBeVisible();
});