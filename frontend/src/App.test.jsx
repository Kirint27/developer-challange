import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

describe('App component', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Caseworker Task Management System')).toBeInTheDocument();
  });

  it('renders the add task button', () => {
    render(<App />);
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });


  it('renders the task status dropdown', async () => {
    vi.mock('fetch', () => {
      return vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([{ id: 3, title: 'Test', description: 'test task', status: 'in progress' }]),
      });
    });

});

it('opens the add task modal when the button is clicked', () => {
  render(<App />);
  const button = screen.getByText('Add Task');
  fireEvent.click(button);
  expect(screen.getByText('Add New Task')).toBeInTheDocument();
});
it('changes the status of a task when the status dropdown is changed', async () => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ message: 'Task status updated successfully' }),
  });
  global.fetch = fetchMock;

  render(<App />);
  await waitFor(() => screen.getByRole('listitem'));

  console.log('Tasks:', tasks); // Add this line to log the tasks variable

  const dropdown = screen.getByTestId('status-dropdown-3');
  fireEvent.change(dropdown, { target: { value: 'completed' } });

  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  expect(fetchMock).toHaveBeenCalledWith(
    'http://localhost:3001/api/tasks/3',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'completed' }),
    }
  );
});
})