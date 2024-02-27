const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection module
const jwt = require('jsonwebtoken');
const tokenver = require('../tokenver.js')
const secret_key = tokenver.secret_key


router.post('/', tokenver.verifyToken, (req, res) => {
  console.log("Create a specific trip for a user")
  jwt.verify(req.token, secret_key, (err) => {
    if(err){
      res.status(401).json({ error: 'Authentication Failure' });
    }else{
      const body = req.body; // This should contain the updated car data

      // SQL query to update car details in the 'cars' table
      const query = 'INSERT into tenant_history (tenant_phone, car_id, price, city, start, end) VALUES(?,?,?,?,?,?)';

      // Values to be updated
      const values = [body.phone, body.carId, body.price, body.city, body.start, body.end];

      // Execute the SQL query to update the car details
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error inserting user trip details:', err);
          res.status(500).json({ error: 'Failed to update user trip details' });
        } else {
            res.json({ message: 'User trip details updated successfully' });
          
        }
      });
    }
  })
})

//api to return trip history based on tenant id
router.get('/user/:userId', (req, res) => {
  console.log("Retrieve all trips of a user")
  const userId = req.params.userId;

  // SQL query to update car details in the 'cars' table
  const query = 'SELECT id, tenant_phone, car_id, price, pending, city, start, end, approve FROM tenant_history where tenant_phone=?';

  // Values to be updated
  const values = [userId];

  // Execute the SQL query to update the car details
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error retrieving all user details:', err);
      res.status(500).json({ error: 'Failed to retrieve all user details' });
    } else {
      console.log('All User trips retrieved successfully');
      res.json(results);
    }
  });
})

router.get('/:tripId', (req, res) => {
  console.log("Retrieve a specific trip")
  const tripId = req.params.tripId;

  // SQL query to update car details in the 'cars' table
  const query = 'SELECT id, tenant_phone, car_id, price, pending, city, start, end, approve FROM tenant_history WHERE id=?';

  // Values to be updated
  const values = [tripId];

  // Execute the SQL query to update the car details
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error retrieving user details:', err);
      res.status(500).json({ error: 'Failed to retrieve user details' });
    } else {
      console.log('Trip details retrieved successfully');
      res.json(results[0]);
      
    }
  });
})

//need to handle try catch
router.put('/:tripId', tokenver.verifyToken, (req, res) => {
  jwt.verify(req.token, secret_key, (err) => {
    if(err){
      res.status(401).json({ error: 'Authentication Failure' });
    }else{
      const tripId = req.params.tripId;
      const updatedTrip = req.body; // This should contain the updated car data

      // SQL query to update car details in the 'teanant' table
      const query = 'UPDATE tenant_history SET tenant_phone=?, car_id=?, price=?, pending=?, city=?, start=?, end=?, approve=? WHERE id=?';
      var profile_completed = 1

      // Values to be updated
      const values = [updatedTrip.tenant_phone, 
        updatedTrip.car_id, 
        updatedTrip.price, 
        updatedTrip.pending, 
        updatedTrip.city, 
        updatedTrip.start, 
        updatedTrip.end, 
        updatedTrip.approve, 
        tripId];
      // Execute the SQL query to update the car details
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error updating trip details:', err);
          res.status(500).json({ error: 'Failed to update trip details' });
        } else {
          if (results.affectedRows > 0) {
            res.json({ message: 'Trip details updated successfully' });
          } else {
            res.status(404).json({ error: 'Trip not found' });
          }
        }
      });
    }
  })
})

router.get('/', (req, res) => {
  // const tripId = req.params.tripId;
  console.log("Retrieve all trips")
  // SQL query to update car details in the 'cars' table
  const query = 'SELECT id, tenant_phone, car_id, price, pending, city, start, end, approve FROM tenant_history';

  // Values to be updated
  const values = [];

  // Execute the SQL query to update the car details
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error retrieving all trips:', err);
      res.status(500).json({ error: 'Failed to retrieve all the trips' });
    } else {
      console.log('Trips retrieved successfully');
      res.json(results);
      
    }
  });
})

router.delete('/:tripId', tokenver.verifyToken, (req, res) => {
  // if(!req.oidc.isAuthenticated()){
  //   res.status(401).json({ error: 'User not authorized!' });
  // }
    console.log("Delete a specific trip")
    jwt.verify(req.token, secret_key, (err) => {
      if(err){
        res.status(401).json({ error: 'Authentication Failure' });
      }else{
        const tripId = req.params.tripId;

        // SQL query to update car details in the 'cars' table
        const query = 'DELETE FROM tenant_history WHERE id=?';

        // Values to be updated
        const values = [tripId];

        // Execute the SQL query to update the car details
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error deleting trip details:', err);
            res.status(500).json({ error: 'Failed to delete trip details' });
          } else {
              res.json({ message: 'Trip details deleted successfully' });
            
          }
        });
      }
  })
})

module.exports = router;