import { test, expect } from '@playwright/test';

// Requires examples dev server running

test('popover opens with row details on Info click', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Examples' })).toBeVisible();
  const aliceRow = page.locator('tbody tr').filter({ hasText: 'Alice' }).first();
  await expect(aliceRow).toBeVisible();
  const infoBtn = aliceRow.locator('button', { hasText: 'Info' }).first();
  await expect(infoBtn).toBeVisible();
  await infoBtn.click();
  await expect(page.getByText('Row details')).toBeVisible();
  await expect(page.getByText('ID: 1')).toBeVisible();
  await expect(page.getByText('Name: Alice')).toBeVisible();
});
