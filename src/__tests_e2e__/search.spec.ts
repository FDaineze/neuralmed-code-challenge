import { test, expect } from '@playwright/test';

test('Should search for a hero and wait for the result', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.locator('#loading').waitFor({ state: 'hidden' });
    await page.fill('input[placeholder="Search characters..."]', 'iron man');
    await page.press('input[placeholder="Search characters..."]', 'Enter');

    await page.locator('#loading').waitFor({ state: 'hidden' });

    const tableLocator = page.locator('table');
    const noCharactersFoundLocator = page.locator('p', { hasText: 'No characters found.' });

    let foundResult = false;

    await expect(tableLocator).toContainText('Iron Man').then(() => {
        foundResult = true;
    }).catch(() => { });

    await expect(noCharactersFoundLocator).toBeVisible().then(() => {
        foundResult = true;
    }).catch(() => { });

    expect(foundResult).toBe(true);
});
