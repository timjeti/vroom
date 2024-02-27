// db.js

const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  // host: '127.0.0.1',
  user: "root",
  password: "Vermelion23@",
  database: "jaawo",
  socketPath: "/cloudsql/self-savari:us-central1:jaawo"
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = connection;
