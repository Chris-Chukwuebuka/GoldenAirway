const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Load environment variables

const cookieParser = require('cookie-parser');

const session = require('express-session');

const bodyParser = require('body-parser');
const parcelRoutes = require('./routes/parcelRoutes');

//import the routes for admin and authentication
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

//global middleware configuration for json data
app.use(express.json());

//global middleware configuration for bodyparser
app.use(bodyParser.json());

//global middleware configuration for cookie parser
app.use(cookieParser());

app.use((req, res, next) => {
    console.log('CORS middleware applied');
    next();
  });

//global middleware configuration for cors
app.use( cors({
    origin: ['https://goldenairwayadminpanel.vercel.app', 'https://goldenairwaycourier-website.vercel.app/'], // Your actual frontend domains
    credentials: true // Allows cookies and other credentials to be sent
  }));
  

//routes
app.use('/api', parcelRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);



//create a default route
app.get('/', (req, res) => {
    res.send('Hello Server Is Live');
    });



    module.exports = app;
