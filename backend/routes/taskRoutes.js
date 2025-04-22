const express = require("express");
const router = express.Router();
const connection = require("../db/databaseSetup");
// add task to database
router.post("/tasks", (req, res) => {
  const { title, description, status, due_date } = req.body;

  // Basic validation (you can expand on this)
  if (!title || !status) {
    return res.status(400).json({ error: "Title and status are required" });
  }

  const query = `
        INSERT INTO tasks (title, description, status, due_date)
        VALUES (?, ?, ?, ?)
    `;

  connection.query(
    query,
    [title, description || null, status, due_date || null],
    (err, results) => {
      if (err) {
        console.error(" Error creating task:", err);
        return res.status(500).json({ error: "Failed to create task" });
      }

      res
        .status(201)
        .json({
          message: "✅ Task created successfully",
          taskId: results.insertId,
        });
    }
  );
});

//delete task from database
router.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const query = "DELETE FROM tasks WHERE id = ?";
  connection.query(query, [taskId], (err, results) => {
    if (err) {
      console.error("Error deleting task:", err);
      return res.status(500).json({ error: "Failed to delete task" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  });
});
// get all tasks from database
router.get("/tasks", (req, res) => {
  const query = "SELECT * FROM tasks ORDER BY created_at DESC";

  connection.query(query, (err, results) => {
    if (err) {
      console.error(" Error retrieving tasks:", err);
      return res.status(500).json({ error: "Failed to fetch tasks" });
    }

    res.status(200).json(results); // ✅ Sends back an array of task objects
  });
});

// get task by id from database
router.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  const query = "SELECT * FROM tasks WHERE id = ?";

  connection.query(query, [taskId], (err, results) => {
    if (err) {
      console.error(" Error fetching task:", err);
      return res.status(500).json({ error: "Failed to retrieve task" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(results[0]); //  Return the single task object
  });
});

// Update the status of a task
router.put("/tasks/:id/status", (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const query = "UPDATE tasks SET status = ? WHERE id = ?";

  connection.query(query, [status, taskId], (err, results) => {
    if (err) {
      console.error(" Error updating task status:", err);
      return res.status(500).json({ error: "Failed to update task status" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: " Task status updated successfully" });
  });
});
module.exports = router;