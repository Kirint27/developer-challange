const express = require("express");
const cors = require("cors");
const app = express();
require("./db/databaseSetup"); // Setting up DB connection
const taskRouter = require("./routes/taskRoutes"); // Import task routes

// Middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    // Allow requests from this origin
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// Use task routes under the /api path
app.use("/api", taskRouter); 

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the task challenge API");
});

// Export app to use in server.js
module.exports = app;
