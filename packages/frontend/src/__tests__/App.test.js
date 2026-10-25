import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => [],
  });

  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <App />
    </QueryClientProvider>
  );

  expect(await screen.findByText(/TODO App/i)).toBeInTheDocument();
});

test('shows empty state when there are no todos', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => [],
  });

  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <App />
    </QueryClientProvider>
  );

  expect(await screen.findByText(/No todos yet/i)).toBeInTheDocument();
});

test('calculates stats from the todos array', async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => [
      { id: 1, title: 'Write code', completed: false },
      { id: 2, title: 'Ship it', completed: true },
    ],
  });

  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <App />
    </QueryClientProvider>
  );

  expect(await screen.findByText('1 items left')).toBeInTheDocument();
  expect(screen.getByText('1 completed')).toBeInTheDocument();
});

test('deletes a todo when the delete button is clicked', async () => {
  const user = userEvent.setup();

  global.fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: 'Write code', completed: false }],
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, title: 'Write code', completed: false }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <App />
    </QueryClientProvider>
  );

  const deleteButton = await screen.findByRole('button', {
    name: /delete todo/i,
  });

  await user.click(deleteButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('/api/todos/1', {
      method: 'DELETE',
    });
  });
});

test('shows an error state when loading todos fails', async () => {
  global.fetch.mockRejectedValue(new Error('Failed to fetch todos'));

  render(
    <QueryClientProvider client={createTestQueryClient()}>
      <App />
    </QueryClientProvider>
  );

  expect(await screen.findByText(/Unable to load todos/i)).toBeInTheDocument();
});
