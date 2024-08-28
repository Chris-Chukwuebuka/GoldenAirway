const Parcel = require("../models/parcelModel");
const generateTrackingNumber = require("../helpers/generateTrackingNumber");
const { sendEmail } = require('../helpers/emailServices');

// Create a new parcel
const createParcel = async (req, res) => {
  try {
    const {
      email,
      quantity,
      weight,
      length,
      width,
      height,
      location,
    } = req.body;

    console.log("createParcel: received data", {
      email,
      quantity,
      weight,
      length,
      width,
      height,
      location,
    });

    if (!email || !quantity || !weight || !length || !width || !height || !location) {
      console.log("createParcel: missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    const trackingNumber = generateTrackingNumber();

    console.log("createParcel: generated tracking number", trackingNumber);

    const parcel = new Parcel({
      trackingNumber,
      email,
      quantity,
      weight,
      dimensions: { length, width, height },
      status: { status: "Created", location, timestamp: Date.now() }, // Initialize status as an object
    });

    console.log("createParcel: created parcel object", parcel);

    await parcel.save();

    console.log("createParcel: parcel saved successfully");

    const subject = "Shipment Notification";
    const text = `
Dear Customer,

Your shipment has been successfully created. Below are the details of your shipment:

Tracking Number: ${trackingNumber}

Quantity: ${quantity} Pcs

Weight: ${weight} Kg

Dimensions: ${length} x ${width} x ${height} cm

You can use this tracking number to monitor the status of your shipment on our website.

Thank you for choosing Golden Airways Courier.

Sincerely,

Golden Airways Courier Support Team
support@yourcompany.com
+44 7543878790
    `;

    console.log("createParcel: email body", text);

    await sendEmail(email, subject, text);

    console.log("createParcel: email sent successfully");

    res.status(201).json({ message: "Parcel created", trackingNumber });
  } catch (error) {
    console.error("Error creating parcel:", error);
    res.status(500).json({ error: "Failed to create parcel" });
  }
};

// Update parcel status by ID
const updateParcelStatusById = async (req, res) => {
  try {
    const { _id } = req.params;
    const { status, location } = req.body;

    if (!status || !location) {
      return res.status(400).json({ error: "Status and location are required" });
    }

    const updatedParcel = await Parcel.findByIdAndUpdate(
      _id,
      {
        status: { status, location, timestamp: Date.now() }, // Update status as an object
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedParcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    const subject = "Update on Your Golden Airways Courier Shipment";
    const text = `
Dear Customer,

The status of your shipment has been updated. Below are the details:

Tracking Number: ${updatedParcel.trackingNumber}

New Status: ${status}

Current Location: ${location}

Thank you for choosing Golden Airways Courier.

Sincerely,

Golden Airways Courier Support Team
support@yourcompany.com
+44 7543878790
    `;

    await sendEmail(updatedParcel.email, subject, text);

    res.status(200).json({ message: "Parcel status updated", updatedParcel });
  } catch (error) {
    console.error("Error updating parcel status:", error);
    res.status(500).json({ error: "Failed to update parcel status" });
  }
};

// Get parcel status
const getParcelStatus = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      trackingNumber: req.params.trackingNumber,
    });

    if (!parcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    if (!parcel.status) {
      return res.status(400).json({ error: "No status available for this parcel" });
    }

    await sendParcelStatusEmail(
      parcel.email,
      parcel.trackingNumber,
      parcel.status.status,
      parcel.status.location
    );

    res.status(200).json({
      trackingNumber: parcel.trackingNumber,
      status: parcel.status,
    });
  } catch (error) {
    console.error("Error retrieving parcel status:", error);
    res.status(500).json({ error: "Failed to retrieve parcel status" });
  }
};

// Send parcel status email
const sendParcelStatusEmail = async (email, trackingNumber, status, location) => {
  try {
    const subject = "Your Shipment Status Update";
    const text = `
Dear Customer,

Here is the latest status of your shipment:

Tracking Number: ${trackingNumber}

Current Status: ${status}

Location: ${location}

You can continue to monitor the status of your shipment on our website.

Thank you for choosing Golden Airways Courier.

Sincerely,

Golden Airways Courier Support Team
support@yourcompany.com
+44 7543878790
    `;

    await sendEmail(email, subject, text);

    console.log("Status email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending status email:", error);
  }
};

// Get all parcels
const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.status(200).json({ parcels });
  } catch (error) {
    console.error("Error retrieving all parcels:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete parcel by ID
const deleteParcelById = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedParcel = await Parcel.findByIdAndDelete(_id);

    if (!deletedParcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    res.status(200).json({ message: "Parcel deleted", deletedParcel });
  } catch (error) {
    console.error("Error deleting parcel:", error);
    res.status(500).json({ error: "Failed to delete parcel" });
  }
};

module.exports = {
  createParcel,
  updateParcelStatusById,
  getParcelStatus,
  getAllParcels,
  deleteParcelById,
};
