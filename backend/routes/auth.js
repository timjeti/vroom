const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenver = require('../tokenver');

const secret_key = tokenver.secret_key

    
router.post('/signin', async (req, res) => {
  console.log("Signing in user")
  const { username, password } = req.body;

  // Retrieve the stored password hash from the database
  const sql = 'SELECT password FROM admin WHERE username = ?';
  connection.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Error retrieving user data:', err);
      res.status(500).json({ message: 'Login failed'});
    } else if (results.length === 0) {
      res.status(401).json({ message: 'User not found'});
    } else {
      // Compare the stored password hash with the user-provided password
      const hashedPassword = results[0].password;
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        console.log('Login successful');
        jwt.sign({ username }, secret_key, { expiresIn: '36000s' }, (err, token) => {
          res.json({
          token
          });
        });
        
      } else {
        res.status(401).json({ error: 'Login failed'});
      }
    }
  });
  });

  router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const state = 0; // Default state value
    const timestamp = new Date(); // Current timestamp
    // Find the user by username
    // SQL query to insert a new car entry into the 'cars' table
    const query = 'INSERT INTO admin (username, password, timestamp) VALUES (?,?,?)';
    // Values to be inserted
    const values = [username, hashedPassword, timestamp];

    // Execute the SQL query to insert the new car entry
    connection.query(query, values, (err, results) => {
    if (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Error creating user' });
    } else {
        res.status(201).json({ message: 'User created' });
    }
    });

        // FORMAT OF TOKEN
    // Authorization: Bearer <access_token>
  
  
    
  });

  module.exports = router
  // module.exports ={
  //   jwt, secret_key, verifyToken
  // }