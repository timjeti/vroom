const express = require('express')
bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
// const { auth } = require('express-openid-connect');
// require('dotenv').config()
const jwt = require('jsonwebtoken');

const app = express()
const PORT = process.env.PORT || 8080;

const carRoute = require('./routes/cars')
const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth')
const sliderRoute = require('./routes/slider')
const userRoute = require('./routes/users')
const tripRoute = require('./routes/trips')

app.use(express.json());
//set incoming connection url for cors
//for testing currently allowed for all
app.use(cors({
	// origin: 'http://localhost:8080',
	origin: '*',
	// Allow follow-up middleware to override this CORS for options
	preflightContinue: true,
  }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
// app.use(auth(config))

// Define the path to the "/uploads/slider" directory
const uploadsDirectory = path.join(__dirname, 'uploads', 'slider');
const userPrfUploadsDirectory = path.join(__dirname, 'uploads', 'users', 'prof');
const userIdUploadsDirectory = path.join(__dirname, 'uploads', 'users', 'idnt');
const uploadsextrasDirectory = path.join(__dirname, 'uploads', 'extras');
          
console.log(uploadsDirectory)
// Serve static files from the "/uploads/slider" directory
//created a new folder public and copied contents of buildfolder from react to public
//added public as static path, to serve html files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/slider', express.static(uploadsDirectory));
app.use('/uploads/extras', express.static(uploadsextrasDirectory));
app.use('/uploads/users/prof', express.static(userPrfUploadsDirectory));
app.use('/uploads/users/idnt', express.static(userIdUploadsDirectory));

app.use('/cars', carRoute)
app.use('/admin', adminRoute)
app.use('/auth', authRoute)
app.use('/slider', sliderRoute)
app.use('/users', userRoute)
app.use('/trips', tripRoute)

// app.post('/api/posts', verifyToken, (req, res) => {
// 	jwt.verify(req.token, 'secretkey', (err, authData) => {
// 	  if (err) {
// 		res.send({ result: "no login" });
// 	  } else {
// 		res.json({
// 		  message: 'Post created...',
// 		  authData
// 		});
// 	  }
// 	});
//   });
  


app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`)
})