const express = require('express')
bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');

const app = express()
const port = 4000

const carRoute = require('./routes/cars')
const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth')
const sliderRoute = require('./routes/slider')


app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded

// Define the path to the "/uploads/slider" directory
const uploadsDirectory = path.join(__dirname, 'uploads', 'slider');
console.log(uploadsDirectory)
// Serve static files from the "/uploads/slider" directory
app.use('/uploads/slider', express.static(uploadsDirectory));

app.use('/cars', carRoute)
app.use('/admin', adminRoute)
app.use('/auth', authRoute)
app.use('/slider', sliderRoute)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})