import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";

import App from "./App";

global.fetch = jest.fn();
const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

describe("App tests", () => {
  it("should render", () => {
    expect(render(<App />)).toBeTruthy();
  });

  jest.mock("fetch", () => {
    return jest.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ message: "Task status updated successfully" }),
      });
    });
  });

  describe("handleStatusChange", () => {
    it("updates task status when user selects a new status", async () => {
      render(<App />);
  
      // Find the dropdown or button to change status
      const statusDropdown = await screen.findByTestId("status-dropdown-3"); // replace with your actual test id
  
      // Simulate changing the status
      fireEvent.change(statusDropdown, { target: { value: "completed" } });
  
      // Optionally wait for fetch to complete
      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith(
          "http://localhost:3001/api/tasks/3/status",
          expect.objectContaining({
            method: "PUT",
          })
        )
      );
  
      // Assert that the UI updates to reflect new status
      const updatedStatus = await screen.findByText("completed");
      expect(updatedStatus).toBeInTheDocument();
    });
  });

  });


