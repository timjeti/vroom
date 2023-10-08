const express = require('express')
bodyParser = require('body-parser');
var cors = require('cors');

const app = express()
const port = 4000

const carRoute = require('./routes/cars')
const adminRoute = require('./routes/admin')


app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded

app.use('/cars', carRoute)
app.use('/admin', adminRoute)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})