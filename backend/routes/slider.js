const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the database connection module
var fileUtils = require('../FileUtils.js')
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var properties = require('../properties.js')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
        console.log("cb function called")
        dir_path = 'uploads/slider';
        cb(null, dir_path);
	},
	filename: (req, file, cb) => {
        file_name = fileUtils.getSliderNameToUpload(file)
        console.log(file_name)
        cb(null, file_name);
	},
	});

var upload = multer({ storage : storage})

router.post('/', upload.single('image'), async (req, res) => {
  console.log("uploading slider")

  const query = 'INSERT INTO slider (slider_id, slider_path, slider_url) VALUES (?,?,?)';

  
	try {

        const filename = req.file.filename;
        const slider_path = `uploads/slider/${filename}`
        const slider_id = path.parse(filename).name;
        const slider_url = `${properties.url}:${properties.port}/${slider_path}`
        const values = [slider_id, slider_path, slider_url];
		
	    console.log(`file_name2: ${filename}`)

      // Execute the SQL query to update the car details
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error uploading car image:', err);
                fileUtils.deleteSliderFile(slider_id);
                res.status(500).json({ error: 'Failed to upload car image' });
            } else {
                res.status(201).json({ message: 'Image uploaded successfully' });
            }
        });
	} 
	catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
	}
	}
	);

    router.get('/',async (req, res) => {
        try{

            console.log("fetching slider")

            const query = 'SELECT slider_id, slider_path, slider_url from slider';
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
        }
        catch(error){
            console.log(error)
            res.status(500).json({ message: 'Internal server error' })
        }
        
    })


    router.get('/:sliderId',async (req, res) => {
        try{
            var sliderId = req.params.sliderId;
            console.log('Get Upload data')
            var contentType = fileUtils.getFileContentType()
            console.log(contentType)
            var fileName = fileUtils.getUploadedSliderName(sliderId)
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

    router.delete('/:sliderId', (req, res) => {
        const sliderId = req.params.sliderId;

        // SQL query to update car details in the 'cars' table
        const query = 'DELETE FROM slider WHERE slider_id=?';

        // Values to be updated
        const values = [sliderId];

        // Execute the SQL query to update the car details
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error deleting slider entry:', err);
                res.status(500).json({ error: 'Failed to delete slider details' });
            } else {
                if (results.affectedRows > 0) {
                    fileUtils.deleteSliderFile(sliderId);
                    res.json({ message: 'Slider File deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Slider details not found' });
                }
            }
        });
      });

    router.put('/updateAll',async (req, res) => {
    try{

        console.log("uploading slider")

        const query = 'SELECT slider_id, slider_path, slider_url from slider';
            // Execute the SQL query using the connection from the imported module
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching slider details:', err);
                res.status(500).json({ error: 'Failed to fetch slider details' });
            } else {
            // Send the fetched car details as JSON response
                // res.json(results);
                const fail = 0;
                for (let i = 0; i < results.length; i++) {
                    const row = results[i]
                    const slider_url = `${properties.url}:${properties.port}/${row.slider_path}`;
                    const updQuery = 'UPDATE slider SET slider_url = ? WHERE slider_id = ?'
                    const updValues = [slider_url, row.slider_id]
                    connection.query(updQuery, updValues, (err, results) => {
                        if (err) {
                            console.error('Error updating slider url:', err);
                            res.status(500).json({ error: 'Failed to update slider details' });
                        } else {
                            if (results.affectedRows > 0) {
                                console.log(`Slider Url with updated successfully`)
                            } else {
                                fail = fail + 1
                                console.log(`Slider Url with update failed`)
                            }
                        }
                    });
                }
                if( fail > 0 ){
                    res.status(500).json({ error: 'Slider Updated With some errors' });
                }
                res.status(200).json({ message: 'Slider Updated Successfully' });
            }
        });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
    
})

      
      module.exports = router;