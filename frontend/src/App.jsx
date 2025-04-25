import { useState, useEffect } from "react";

import "./App.css"; 
import AddTasks from "./Componnets/AddTasks/AddTasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setTasks(data)) // Update tasks state with the fetched data
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handelTaskSubmit = (taskData) => {
    closeModal();
    setTasks((prevTasks) => [...prevTasks, taskData]);
  };


const handleStatusChange = (taskId, newStatus) => {
  fetch(`http://localhost:3001/api/tasks/${taskId}/status`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({ status: newStatus }),
})
.then((response) => { 
  if (!response.ok) {
    throw new Error(`Failed to update task status: ${response.statusText}`);

  }
  return response.json();
})
.then(() => {
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    )
  );
})
.catch((error) => console.error("Error updating task status:", error));
};



  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:3001/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete task: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };
  console.log("Tasks in state:", tasks); // Check what data is in the tasks state

  return (
    <>
      <h1>Caseworker Task Management System</h1>
      <p className="subheading">
        Efficiently track, update, and manage tasks assigned to HMCTS
        caseworkers.
      </p>

      <button onClick={openModal} className="addTasks">
        Add Task
      </button>

      {isModalOpen ? (
        <AddTasks
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handelTaskSubmit}
        />
      ) : null}

      <section>
        {tasks.length === 0 ? (
          <p className="none">No tasks available.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  Status:{" "}
                  <select
                    className="status-select"
                    value={task.status}
                    data-testid={`status-dropdown-${task.id}`}

                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </p>
                <p>
                  Due Date & Time: {new Date(task.due_date).toLocaleString()}
                </p>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete Task
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default App;
