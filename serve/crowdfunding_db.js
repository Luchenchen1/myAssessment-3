const express = require('express');
const mysql = require('mysql');
const port = 3000;
const app = express();


// Create a database connection.
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3307',
  database: 'crowdfunding_db'
});

// Establish a database connection.
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
});

// To start an Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
