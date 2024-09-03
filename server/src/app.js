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


//global middleware configuration for cors
const cors = require('cors');

app.use(cors({
  origin: ['https://goldenairwayadminpanel.vercel.app', 'https://goldenairway-website.vercel.app'], // Replace with your actual frontend domains
  credentials: true
}));


//routes
app.use('/api', parcelRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

//global middleware configuration for session
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 60 * 60 * 1000
    }
}));


//create a default route
app.get('/', (req, res) => {
    res.send('Hello Server Is Live');
    });



    module.exports = app;
