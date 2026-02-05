import { test, expect } from '@playwright/test';

// Assumes dev server is running at baseURL from playwright.config.ts

test('examples app renders breadcrumb and table row', async ({ page }) => {
  page.on('console', (msg) => {
    // helpful logs from the browser context
    console.log('[page console]', msg.type(), msg.text());
  });
  page.on('pageerror', (err) => {
    console.error('[page error]', err);
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Examples' })).toBeVisible();
  await expect(page.locator('table').getByText('Alice')).toBeVisible();
});
