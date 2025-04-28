import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddTasks from './AddTasks'; // Adjust the import path as necessary

describe('AddTasks component', () => {
    it('renders the modal with the correct heading', () => {
      const { getByText } = render(<AddTasks />);
      expect(getByText('Add New Task')).toBeInTheDocument();
    });
  
    it('renders the form with the correct fields', () => {
      const { getByLabelText } = render(<AddTasks />);
      expect(getByLabelText('Name of tasks')).toBeInTheDocument();
      expect(getByLabelText('Description')).toBeInTheDocument();
      expect(getByLabelText('Status')).toBeInTheDocument();
      expect(getByLabelText('Due Date and Time')).toBeInTheDocument();
    });
  
    it('calls the handleSubmit function when the form is submitted', () => {
      const { getByText } = render(<AddTasks />);
      const addTaskButton = getByText('Add Task');
      fireEvent.click(addTaskButton);
      // You can add additional assertions here to test the handleSubmit function
    });
  });