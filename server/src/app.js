const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Load environment variables

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const parcelRoutes = require('./routes/parcelRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

// Global middleware configuration
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['https://goldenairwayadminpanel.vercel.app', 'https://goldenairwaycourier-website.vercel.app'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));

// Routes
app.use('/api', parcelRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello Server Is Live');
});

module.exports = app;
