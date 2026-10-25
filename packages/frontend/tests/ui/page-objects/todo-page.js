class TodoPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async resetTodos() {
    await this.page.evaluate(async () => {
      const response = await fetch('/api/todos');
      const todos = await response.json();

      for (const todo of todos) {
        await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
      }
    });
  }

  get heading() {
    return this.page.getByRole('heading', { name: 'TODO App' });
  }

  get input() {
    return this.page.getByPlaceholder('What needs to be done?');
  }

  get addButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  async createTodo(title) {
    await this.input.fill(title);
    await this.addButton.click();
    await this.page.getByText(title).waitFor();
  }

  get emptyState() {
    return this.page.getByText('No todos yet. Add one above to get started.');
  }

  get errorState() {
    return this.page.getByText('Unable to load todos. Please try again.');
  }

  async toggleTodo(title) {
    const row = this.page.locator('li').filter({ hasText: title }).first();
    await row.getByRole('checkbox').click();
  }

  async editTodo(currentTitle, nextTitle) {
    const editButton = this.page
      .getByRole('button', { name: new RegExp(`Edit todo ${currentTitle}`, 'i') })
      .first();

    await editButton.click();

    const editInput = this.page.getByRole('textbox').last();
    await editInput.fill(nextTitle);

    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByText(nextTitle).waitFor();
  }

  async deleteTodo(title) {
    const row = this.page.locator('li').filter({ hasText: title }).first();
    await row.getByRole('button', { name: new RegExp(`Delete todo ${title}`, 'i') }).click();
  }
}

module.exports = { TodoPage };
