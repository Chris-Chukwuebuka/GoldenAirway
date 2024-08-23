const express = require('express');

const router = express.Router();
const { loginAdmin, logOutAdmin, generateNewSession } = require('../controllers/authController');
const { requireLogin } = require('../middleware/requireLogin');

// Route to create a new admin
router.post('/login', loginAdmin);

// Route to verify an admin's email
router.post('/logout',requireLogin,  logOutAdmin);

// Route to reset an admin's password
router.get('/session', generateNewSession);


module.exports = router;
