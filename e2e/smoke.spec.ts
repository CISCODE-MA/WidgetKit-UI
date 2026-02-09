import { test, expect } from '@playwright/test';

// Basic smoke test to validate dev server & page loads
// Start dev server separately with `npm run dev` before running e2e.

test('homepage loads and has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ciscode-template/i);
});
