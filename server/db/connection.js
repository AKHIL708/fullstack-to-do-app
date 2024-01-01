const mysql = require("mysql2");

// create a new MySQL connection
const pool = mysql.createPool({
  connectionLimit: 4,
  host: "localhost",
  user: "root",
  password: "root123",
  database: "todoapp",
  timezone: "+00:00",
});
// connect to the MySQL database
pool.getConnection((error, connection) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database!");
    connection.release();
  }
});

module.exports = pool;

// close the MySQL connection
