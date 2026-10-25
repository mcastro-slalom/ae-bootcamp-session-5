const { test, expect } = require('@playwright/test');
const { TodoPage } = require('./page-objects/todo-page');

test.describe('Todo app critical journeys', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.resetTodos();
    await page.reload();
  });

  test('creates a todo from the add form', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.createTodo('Buy groceries');

    await expect(todoPage.page.getByText('Buy groceries')).toBeVisible();
    await expect(todoPage.input).toHaveValue('');
  });

  test('edits and toggles a todo item', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.createTodo('Write tests');
    await todoPage.editTodo('Write tests', 'Write better tests');
    await todoPage.toggleTodo('Write better tests');

    await expect(todoPage.page.getByText('Write better tests')).toBeVisible();
    await expect(todoPage.page.getByText('0 items left')).toBeVisible();
  });

  test('shows empty state after deleting the last todo', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.createTodo('Final task');
    await todoPage.deleteTodo('Final task');

    await expect(todoPage.emptyState).toBeVisible();
  });

  test('shows error state when the API fails', async ({ page }) => {
    await page.route('**/api/todos', async (route) => {
      await route.abort();
    });

    await page.goto('/');

    await expect(page.getByText('Unable to load todos. Please try again.')).toBeVisible();
  });
});