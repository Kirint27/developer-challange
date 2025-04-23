import React from "react";
import styles from "./AddTasks.module.scss";

const AddTasks = ({ onClose, onSubmit, handleTaskSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskName = event.target.taskName.value;
    const description = event.target.description.value;
    const status = event.target.status.value;
    const dueDate = event.target.dueDate.value;

    if (!taskName || !description || !status || !dueDate) {
      alert("Please fill in all fields");
      return;
    }

    const url = "http://localhost:3001/api/tasks";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      title: taskName,
      description: description,
      status: status,
      due_date: dueDate,
    });
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task added successfully:", data);
        onClose(); // Close the modal after submitting the task
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
    // Optionally, you can reset the form or show a success message
    event.target.reset();
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2 className={styles.heading}>Add New Task</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>Name of tasks</label>
            <input
              className={styles.input}
              name="taskName"
              type="text"
              required
            />

            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              name="description"
              required
            ></textarea>

            <label className={styles.label}>Status</label>
            <select className={styles.select} name="status">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>

            <label className={styles.label}>Due Date and Time</label>
            <input
              className={styles.input}
              name="dueDate"
              type="datetime-local"
              required
            />

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.button}>
                Add Task
              </button>
              <button onClick={onClose} type="button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTasks;
