const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Create a connection to the database using your provided details
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: 'port', // Database user
  password: 'blogpass', // Database password
  database: 'portfolio' // Database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Endpoint to add a new post
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';
  db.query(sql, [title, content], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.send('Post added');
  });
});

// Endpoint to get all posts
app.get('/api/posts', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
