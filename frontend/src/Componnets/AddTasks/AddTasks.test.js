import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTasks from "./AddTasks";

global.fetch = jest.fn();
const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

describe("AddTasks tests", () => {
  it("should render", () => {
    expect(render(<AddTasks />)).toBeTruthy();
  });

  it("should submit the form and call onClose when the task is added successfully", () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "Task added successfully" }),
    });

    render(<AddTasks onClose={mockOnClose} onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/Name of tasks/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Task description" },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: "Pending" },
    });
    fireEvent.change(screen.getByLabelText(/Due Date and Time/i), {
      target: { value: "2023-10-01T12:00" },
    });
    fireEvent.click(screen.getByText(/Add Task/i));

    return waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New Task",
          description: "Task description",
          status: "Pending",
          due_date: "2023-10-01T12:00",
        }),
      });
      expect(mockOnClose).toHaveBeenCalled(1);
    });
  });

  it("should show an alert if any field is missing", () => {
    render(<AddTasks onClose={mockOnClose} onSubmit={jest.fn()} />);
    fireEvent.click(screen.getByText(/Add Task/i));
    expect(window.alert).toHaveBeenCalledWith("Please fill in all fields");
  });
});
