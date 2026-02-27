import { test, expect } from '@playwright/test';

test('DashboardGrid drag and resize', async ({ page }) => {
  await page.goto('/dashboard');

  // Verify initial widget positions
  const widget = await page.locator('[data-testid="widget-1"]');
  const initialBox = await widget.boundingBox();
  expect(initialBox).not.toBeNull();

  // Drag the widget
  await widget.hover();
  await page.mouse.down();
  await page.mouse.move(initialBox!.x + 100, initialBox!.y + 100);
  await page.mouse.up();

  // Verify new widget position
  const newBox = await widget.boundingBox();
  expect(newBox).not.toEqual(initialBox);

  // Resize the widget
  const resizeHandle = await widget.locator('[data-testid="resize-handle"]');
  await resizeHandle.hover();
  await page.mouse.down();
  await page.mouse.move(newBox!.x + 50, newBox!.y + 50);
  await page.mouse.up();

  // Verify widget size changed
  const resizedBox = await widget.boundingBox();
  expect(resizedBox!.width).toBeGreaterThan(newBox!.width);
  expect(resizedBox!.height).toBeGreaterThan(newBox!.height);
});
