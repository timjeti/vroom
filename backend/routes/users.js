const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection module
var fileUtils = require('../FileUtils.js')
const multer = require('multer');
var properties = require('../properties.js')
const jwt = require('jsonwebtoken');
const tokenver = require('../tokenver.js')
const secret_key = tokenver.secret_key

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
        console.log("cb function called")
        dir_path = 'uploads/users/prof';
        cb(null, dir_path);
	},
	filename: (req, file, cb) => {
        file_name = fileUtils.getUserProfileToUpload(req, file)
        console.log(file_name)
        cb(null, file_name);
	},
	});

var upload = multer({ storage : storage})

const storage2 = multer.diskStorage({
	destination: (req, file, cb) => {
        console.log("cb function called")
        dir_path = 'uploads/users/idnt';
        cb(null, dir_path);
	},
	filename: (req, file, cb) => {
        file_name = fileUtils.getUserIdToUpload(req, file)
        console.log(file_name)
        cb(null, file_name);
	},
	});

var upload2 = multer({ storage : storage2})

router.post('/profile/:userId', tokenver.verifyToken, upload.single('image'), async (req, res) => {
  // if(!req.oidc.isAuthenticated()){
  //   res.status(401).json({ error: 'User not authorized!' });
  // }
    console.log("Uploading user profile image")
    jwt.verify(req.token, secret_key, (err) => {
      if(err){
        res.status(401).json({ error: 'Authentication Failure' });
      }else{
  
        const userId = req.params.userId;
        const query = 'UPDATE tenant SET profile_path = ? WHERE id = ?';
          try {
              const prof_path = `uploads/users/prof/${userId}.png`
              const profile_url = `${properties.url}/${prof_path}`
              const values = [prof_path, userId];
              
            //   console.log(`file_name2: ${filename}`)
      
            // Execute the SQL query to update the car details
              connection.query(query, values, (err, results) => {
                  if (err) {
                      console.error('Error uploading user profile image:', err);
                      fileUtils.deleteFile(prof_path)
                      res.status(500).json({ error: 'Failed to user upload profile image' });
                  } else {
                      res.status(201).json({ message: 'Profile uploaded successfully' });
                  }
              });
          } 
          catch (error) {
              console.log(error);
              return res.status(500).json({ message: 'Internal server error' });
          }
        }
    })
  });

router.post('/identity/:userId', upload2.single('image'), tokenver.verifyToken, async (req, res) => {
  // if(!req.oidc.isAuthenticated()){
  //   res.status(401).json({ error: 'User not authorized!' });
  // }
    console.log("Uploading user identity")
    jwt.verify(req.token, secret_key, (err) => {
      if(err){
        res.status(401).json({ error: 'Authentication Failure' });
      }else{
        const userId = req.params.userId;
        const query = 'UPDATE tenant SET identity_path = ? WHERE id = ?';
          try {
              const idnt_path = `uploads/users/idnt/${userId}.png`
              const idnt_url = `${properties.url}/${idnt_path}`
              const values = [idnt_path, userId];
              
            //   console.log(`file_name2: ${filename}`)
      
            // Execute the SQL query to update the car details
              connection.query(query, values, (err, results) => {
                  if (err) {
                      console.error('Error uploading user identity image:', err);
                      fileUtils.deleteFile(idnt_path)
                      res.status(500).json({ error: 'Failed to user upload identity image' });
                  } else {
                      console.log("Uploaded the identity")
                      res.status(201).json({ message: 'User identity uploaded successfully' });
                  }
              });
          } 
          catch (error) {
              console.log(error);
              return res.status(500).json({ message: 'Internal server error' });
          }
        }
      })
    });

router.post('/', tokenver.verifyToken, (req, res) => {
  // if(!req.oidc.isAuthenticated()){
  //   res.status(401).json({ error: 'User not authorized!' });
  // }
    const { id } = req.body; // Extract car details from the request body
  
    console.log(id)
    // SQL query to insert a new car entry into the 'teanant' table
    const query = 'INSERT INTO tenant (id) VALUES (?)';
    // Values to be inserted
    const values = [id];
  
    // Execute the SQL query to insert the new car entry
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting new user data:', err);
        res.status(500).json({ error: 'Failed to insert new user' });
      } else {
        res.json({ message: 'New user entry inserted successfully' });
      }
    });
  });

  router.put('/:userId', tokenver.verifyToken, (req, res) => {
    jwt.verify(req.token, secret_key, (err) => {
      if(err){
        res.status(401).json({ error: 'Authentication Failure' });
      }else{
        const userId = req.params.userId;
        const updatedUser = req.body; // This should contain the updated car data
      
        // SQL query to update car details in the 'teanant' table
        const query = 'UPDATE tenant SET name=?, age=?, email=? WHERE id=?';
        var profile_completed = 1
      
        // Values to be updated
        const values = [updatedUser.name, updatedUser.age, updatedUser.email, userId];
        // Execute the SQL query to update the car details
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error updating user details:', err);
            res.status(500).json({ error: 'Failed to update user details' });
          } else {
            if (results.affectedRows > 0) {
              res.json({ message: 'User details updated successfully' });
            } else {
              res.status(404).json({ error: 'User not found' });
            }
          }
        });
      }
    })
  })

  router.post('/meta', tokenver.verifyToken, (req, res) => {
    // if(!req.oidc.isAuthenticated()){
    //   res.status(401).json({ error: 'User not authorized!' });
    // }
    jwt.verify(req.token, secret_key, (err) => {
      if(err){
        res.status(401).json({ error: 'Authentication Failure' });
      }else{
        const updatedUser = req.body; // This should contain the updated car data
      
        // SQL query to update car details in the 'teanant' table
        // const query = 'UPDATE tenant SET name=?, age=?, email=?, profile_details=? WHERE id=?';
        const query = 'INSERT INTO tenant (id, name, age, email, created) VALUES (?,?,?,?,?)';
        var profile_completed = 1
      
        // Values to be updated
        const values = [updatedUser.phone, updatedUser.name, updatedUser.age, updatedUser.email, updatedUser.created];
        // Execute the SQL query to update the car details
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error updating user details:', err);
            res.status(500).json({ error: 'Failed to update user details' });
          } else {
              res.json({ message: 'User details updated successfully' });
          }
        });
      }
    })
  })

  router.get('/', (req, res) => {
    // if(!req.oidc.isAuthenticated()){
    //   res.status(401).json({ error: 'User not authorized!' });
    // }
    console.log("Fetching all users")
  
    // SQL query to update car details in the 'teanant' table
    const query = 'SELECT id, age, name, email, profile_details, profile_path, identity_path, created FROM tenant';
  
    // Values to be updated
    const values = [];
  
    // Execute the SQL query to update the car details
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error retrieving user details:', err);
        res.status(500).json({ error: 'Failed to retrieve user details' });
      } else {
          console.log('All User details retrieved successfully');
          res.json(results);
        }
    });
  })


  router.get('/:userId', (req, res) => {
    // if(!req.oidc.isAuthenticated()){
    //   res.status(401).json({ error: 'User not authorized!' });
    // }
    console.log("Fetching user specific data")
    const userId = req.params.userId;
  
    // SQL query to update car details in the 'teanant' table
    const query = 'SELECT id, age, name, email, profile_details, profile_path, identity_path, created FROM tenant WHERE id=?';
  
    // Values to be updated
    const values = [userId];
  
    // Execute the SQL query to update the car details
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error retrieving user details:', err);
        res.status(500).json({ error: 'Failed to retrieve user details' });
      } else {
          console.log('User details retrieved successfully' )
          // res.json({ message: 'User details retrieved successfully' });
          res.json(results[0]);
        }
    });
  })

  router.delete('/:userId', tokenver.verifyToken, (req, res) => {
    // if(!req.oidc.isAuthenticated()){
    //   res.status(401).json({ error: 'User not authorized!' });
    // }
    jwt.verify(req.token, secret_key, (err) => {
      if(err){
        res.status(401).json({ error: 'Authentication Failure' });
      }else{
        const userId = req.params.userId;
      
        // SQL query to update car details in the 'teanant' table
        const query = 'DELETE FROM tenant WHERE id=?';
      
        // Values to be updated
        const values = [userId];
      
        // Execute the SQL query to update the car details
        connection.query(query, values, (err, results) => {
          if (err) {
            console.error('Error deleting user details:', err);
            res.status(500).json({ error: 'Failed to delete user details' });
          } else {
              res.json({ message: 'User details deleted successfully' });
            }
        });
      }
    })
  })
  


module.exports = router;