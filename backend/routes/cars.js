// cars.js

const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection module
var fileUtils = require('../FileUtils.js')
const multer = require('multer');

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
  const query = 'SELECT car_id, car_name, car_price, car_path FROM cars';

  // Execute the SQL query using the connection from the imported module
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching car details:', err);
      res.status(500).json({ error: 'Failed to fetch car details' });
    } else {
      // Send the fetched car details as JSON response
      res.json(results);
    }
  });
});

router.put('/:carId', (req, res) => {
  const carId = req.params.carId;
  const updatedCar = req.body; // This should contain the updated car data

  // SQL query to update car details in the 'cars' table
  const query = 'UPDATE cars SET car_name=?, car_price=?, car_path=? WHERE car_id=?';

  // Values to be updated
  const values = [updatedCar.car_name, updatedCar.car_price, updatedCar.car_path, carId];

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
})

router.post('/', (req, res) => {
  const { car_id, car_name, car_price } = req.body; // Extract car details from the request body

  
  // SQL query to insert a new car entry into the 'cars' table
  const query = 'UPDATE cars SET car_name = ?,car_price = ? WHERE car_id = ?';

  // Values to be inserted
  const values = [car_name, car_price, car_id];

  // Execute the SQL query to insert the new car entry
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting new car entry:', err);
      res.status(500).json({ error: 'Failed to insert new car entry' });
    } else {
      res.json({ message: 'New car entry inserted successfully' });
    }
  });
});

router.delete('/:carId', (req, res) => {
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
});

router.post('/upload/:carId', upload.single('image'), async (req, res) => {
	console.log("uploading picture")
  const carId = req.params.carId;
  const isFirst = req.query.isFirst;
  if(!isFirst){
    res.status(201).json({ message: 'Image uploaded successfully' });
  }
  const query = 'INSERT INTO cars (car_id, car_path) VALUES (?,?)';
  const car_path = `uploads/${carId}`
  const values = [carId, car_path];
  
	try {
		const filename = req.file;
		console.log(`file_name2: ${filename}`)

      // Execute the SQL query to update the car details
    connection.query(query, values, (err, results) => {
      if (err) {
        if(err.message.includes('Duplicate entry')){
          res.status(201).json({ message: 'Image uploaded successfully' });
          return;
        }
        console.error('Error uploading car image:', err);
        fileUtils.deleteUploadedFile(carId);
        res.status(500).json({ error: 'Failed to upload car image' });
      } else {
        res.status(201).json({ message: 'Image uploaded successfully' });
      }
    });
	} 
	catch (error) {
    // console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
	}
	}
	);

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
