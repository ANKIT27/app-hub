const { test, expect } = require('@playwright/test');

test.describe('Todo App - Full Workflow', () => {
  const taskText = 'Playwright E2E Task';

  test('add, complete, and persist todo', async ({ page }) => {
    // Step 1: Visit the deployed app
    await page.goto('/');

    // Step 2: Add a new todo
    const input = page.locator('input[placeholder="What needs to be done today?"]'); 
    await input.fill(taskText);
    await input.press('Enter'); 

    // Verify todo appears in list
    await expect(page.getByText(taskText)).toBeVisible();

    // Step 3: Mark the todo as complete
    const checkbox = page.locator(`text=${taskText}`).locator('..').locator('input[type="checkbox"]');
    await checkbox.check();

    // Verify it's marked complete (class change or strike-through)
    await expect(page.getByText(taskText)).toHaveClass(/done/i);

    // Step 4: Reload page
    await page.reload();

    // Step 5: Verify task is still present and marked complete (persistence check)
    await expect(page.getByText(taskText)).toBeVisible();
    await expect(page.getByText(taskText)).toHaveClass(/done/i);
  });
});
