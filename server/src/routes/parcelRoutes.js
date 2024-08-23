const express = require('express');
const { createParcel, updateParcelStatusById, getParcelStatus } = require('../controllers/parcelControllers');
const router = express.Router();

// Route to create a new parcel
router.post('/admin/parcels', createParcel);

// Route to update parcel status by ID
router.put('/admin/parcels/:_id/status', updateParcelStatusById);

// Route to get parcel status by tracking number
router.get('/parcels/:trackingNumber', getParcelStatus);

module.exports = router;
