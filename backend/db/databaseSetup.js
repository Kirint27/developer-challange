const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // Your MySQL password (empty for root by default)
  database: 'task_manager_db'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL database:', err.message);
    return;
  }

  console.log('✅ Connected to MySQL database');

  // Now create the table once the connection is successful
  const createTasksTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) NOT NULL,
        due_date DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error(' Error creating tasks table:', err.message);
      } else {
        console.log(' Tasks table created (if not exists)');
      }
    });
  };

  // Call function to create tasks table
  createTasksTable();
});

module.exports = connection;
