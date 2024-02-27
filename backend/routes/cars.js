// cars.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection module
var fileUtils = require('../FileUtils.js')
const multer = require('multer');
const jwt = require('jsonwebtoken')
const tokenver = require('../tokenver.js')
const secret_key = tokenver.secret_key


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	console.log("cb function called")
	// fileUtils.someMethod();
	unq_id  = req.query.unq_id
	dir_path = 'uploads'
	// fileUtils.createDirectory(dir_path)
	cb(null, dir_path);
	},
	filename: (req, file, cb) => {
	file_name = fileUtils.geFileNameToUpload(req, file)
	cb(null, file_name);
	},
	});

var upload = multer({ storage : storage})

// Route for fetching car details
router.get('/', (req, res) => {
  // SQL query to fetch car details
  console.log("Retrieving all the Cars")
  const query = 'SELECT car_id, car_name, car_price, car_price_min, car_cc, car_path, car_type, available FROM cars';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching car details:', err);
      res.status(500).json({ error: 'Failed to fetch car details' });
    } else {
      // Send the fetched car details as JSON response
      res.json(results);
    }
  });
  // Execute the SQL query using the connection from the imported module
});

router.put('/:carId', tokenver.verifyToken, (req, res) => {
  // if(!req.oidc.isAuthenticated()){
  //   res.status(401).json({ error: 'User not authorized!' });
  // }
  console.log("Updating an existing car")
  jwt.verify(req.token, secret_key, (err) => {
    if(err){
      res.status(401).json({ error: 'Authentication Failure' });
    }else{
      const carId = req.params.carId;
      const updatedCar = req.body; // This should contain the updated car data

      // SQL query to update car details in the 'cars' table
      const query = 'UPDATE cars SET car_name=?, car_price=?,car_price_min=?, car_cc=?, car_type=?, available=? WHERE car_id=?';

      // Values to be updated
      const values = [updatedCar.car_name, updatedCar.car_price, updatedCar.car_price_min, updatedCar.car_cc, updatedCar.car_type, updatedCar.available, carId];

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
})

router.post('/', tokenver.verifyToken, (req, res) => {
  console.log("Adding a new car")
  jwt.verify(req.token, secret_key, (err) => {
    if(err){
      res.status(401).json({ error: 'Authentication Failure' });
    }else{
      const { car_id, car_name, car_price, car_price_min, car_cc, car_type } = req.body; // Extract car details from the request body
  
      console.log(car_id)
      // SQL query to insert a new car entry into the 'cars' table
      const query = 'INSERT INTO cars (car_id, car_name, car_price, car_price_min, car_cc, car_type) VALUES (?, ?, ?, ?)';
    
      // Values to be inserted
      const values = [car_id, car_name, car_price, car_price_min, car_cc, car_type];
    
      // Execute the SQL query to insert the new car entry
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error inserting new car entry:', err);
          res.status(500).json({ error: 'Failed to insert new car entry' });
        } else {
          console.log("Car meta details added successfuly")
          res.json({ message: 'New car entry inserted successfully' });
        }
      });
    }
  })
});

router.delete('/:carId', tokenver.verifyToken, (req, res) => {
  console.log("Removing a car")
  jwt.verify(req.token, secret_key, (err) => {
    if(err){
      res.status(401).json({ error: 'Authentication Failure' });
    }else{
      const carId = req.params.carId;
      const updatedCar = req.body; // This should contain the updated car data
    
      // SQL query to update car details in the 'cars' table
      const query = 'DELETE FROM cars WHERE car_id=?';
    
      // Values to be updated
      const values = [carId];
    
      // Execute the SQL query to update the car details
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error('Error deleting car entry:', err);
          res.status(500).json({ error: 'Failed to delete car details' });
        } else {
          if (results.affectedRows > 0) {
            fileUtils.deleteUploadedFile(carId);
            res.json({ message: 'Car details deleted successfully' });
          } else {
            res.status(404).json({ error: 'Car not found' });
          }
        }
      });
    }
  })
});

router.post('/upload/:carId', upload.single('image'),tokenver.verifyToken, async (req, res) => {
	console.log("Uploading a car image")
  jwt.verify(req.token, secret_key, (err) => {
    if(err){
      res.status(401).json({ error: 'Authentication Failure' });
    }else{
      const carId = req.params.carId;
      const isFirst = req.query.isFirst;
      if(!isFirst){
        res.status(201).json({ message: 'Image uploaded successfully' });
        return
      }
      const query = 'UPDATE cars SET car_path=? WHERE car_id=?';
      const car_path = `uploads/${carId}`
      const values = [car_path, carId];
      
      try {
        const file = req.file;
        console.log(`file_name2: ${file.filename}`)
    
          // Execute the SQL query to update the car details
        connection.query(query, values, (err, results) => {
          if (err) {
            if(err.message.includes('Duplicate entry')){
              res.status(209).json({ message: 'Image already exists' });
              return;
            }
            console.error('Error uploading car image:', err);
            fileUtils.deleteUploadedFile(carId);
            res.status(500).json({ error: 'Failed to upload car image' });
          } else {
            console.log('Car Image uploaded successfully')
            res.status(201).json({ message: 'Image uploaded successfully' });
          }
        });
      } 
      catch (error) {
        // console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  })
	});

  //In this api exceptions are handled properly
router.get('/upload/:carId',async (req, res) => {
	try{
		var carId = req.params.carId;
		console.log('Get Upload data')
		var contentType = fileUtils.getFileContentType()
		console.log(contentType)
		var fileName = fileUtils.getUploadedFileName(carId)
		var absolutePath = fileUtils.getAbsolutePath(fileName);
		console.log(absolutePath)
		res.setHeader('content-type', `${contentType}`);
		res.status(200)
		return res.sendFile(absolutePath)
	}
	catch(error){
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
	
})

module.exports = router;
