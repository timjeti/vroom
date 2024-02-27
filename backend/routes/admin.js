// admin.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection module
const jwt = require('jsonwebtoken');
const tokenver = require('../tokenver.js')
const secret_key = tokenver.secret_key

// Route for updating car details (admin API)
router.put('/:carId', (req, res) => {
  console.log("Update car details via admin route")
  jwt.verify(req.token, secret_key, (err) => {
    if(err){
      res.status(401).json({ error: 'Authentication Failure' });
    }else{
      const carId = req.params.carId;
      const updatedCar = req.body; // This should contain the updated car data

      // SQL query to update car details in the 'cars' table
      const query = 'UPDATE cars SET car_name=?, car_price=?, car_dir=? WHERE id=?';

      // Values to be updated
      const values = [updatedCar.car_name, updatedCar.car_price, updatedCar.car_dir, carId];

      // Execute the SQL query to update the car details
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error updating car details:', err);
          res.status(500).json({ error: 'Failed to update car details' });
        } else {
          if (results.affectedRows > 0) {
            res.json({ message: 'Car details updated successfully' });
          } else {
            res.status(404).json({ error: 'Car not found' });
          }
        }
      });
    }
  })
});

module.exports = router;