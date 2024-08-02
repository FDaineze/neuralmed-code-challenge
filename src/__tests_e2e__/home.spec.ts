import { test, expect } from '@playwright/test';

test('Should load the page and find the search input in structure', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.locator('#loading').waitFor({ state: 'hidden' });
  await expect(page.locator('input[placeholder="Search characters..."]')).toBeVisible();
  await expect(page.locator('table')).toBeVisible();
});
