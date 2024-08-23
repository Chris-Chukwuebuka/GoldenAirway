const express = require('express');
const router = express.Router();
const { createNewAdmin, verifyAdmin, resetPassword, getCurrentAdmin } = require('../controllers/adminControllers');
const { requireLogin } = require('../middleware/requireLogin');

// Route to create a new admin
router.post('/register', createNewAdmin);

// Route to verify an admin's email
router.put('/verify', verifyAdmin);

// Route to reset an admin's password
router.put('/reset-password', resetPassword);

// Route to get the current admin's details (requires authentication)
router.get('/me', requireLogin, getCurrentAdmin);

module.exports = router;
