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
    it("should update task status on success", () => {
      const { getByTestId } = render(<App />);
      const handleStatusChange = getByTestId("handleStatusChange");
      const taskId = 3;
      const newStatus = "completed";

      handleStatusChange(taskId, newStatus).then(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
          `http://localhost:3001/api/tasks/${taskId}/status`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );
      });
    });
  });


  });


