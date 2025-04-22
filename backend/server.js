const app = require("./app"); // Import the app from app.js
const PORT = process.env.PORT || 3001; // Port to listen on

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
