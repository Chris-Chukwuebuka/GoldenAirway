const Parcel = require("../models/parcelModel");
const generateTrackingNumber = require("../helpers/generateTrackingNumber");
const { sendEmail } = require('../helpers/emailServices'); // Check this path

// Create a new parcel
const createParcel = async (req, res) => {
  try {
    console.log("Create parcel endpoint called with body:", req.body);

    const {
      email,
      quantity,
      weight,
      length,
      width,
      height,
      location,
    } = req.body;

    if (!email || !quantity || !weight || !length || !width || !height || !location) {
      console.log("Error: Some fields are missing");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check for existing parcel with the same recipient email
    const existingParcel = await Parcel.findOne({ recipientEmail: email });
    if (existingParcel) {
      console.log("Error: Parcel with this email already exists");
      return res.status(409).json({ error: "Parcel with this email already exists" });
    }

    const trackingNumber = generateTrackingNumber();
    console.log("Generated tracking number:", trackingNumber);

    const parcel = new Parcel({
      trackingNumber,
      recipientEmail: email,
      quantity,
      weight,
      dimensions: {
        length,
        width,
        height,
      },
      status: [{ status: "Created", location }],
    });

    await parcel.save();
    console.log("Parcel saved to the database");

    const subject = "Shipment Notification !!";
    const text = `
Dear Customer,

Your shipment has been successfully created. Below are the details of your shipment:

Tracking Number: ${trackingNumber}

Quantity: ${quantity}Pcs

Weight: ${weight}Kg

Dimensions: ${length} x ${width} x ${height} cm

You can use this tracking number to monitor the status of your shipment on our website.

Thank you for choosing Golden Airways Courier.

Sincerely,

Golden Airways Courier Support Team
support@yourcompany.com
+44 7543878790
    `;

    console.log("Sending email notification to:", email);

    // Send the email notification
    await sendEmail(email, subject, text);

    console.log("Email notification sent successfully");

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

    const updatedParcel = await Parcel.findByIdAndUpdate(
      _id,
      {
        $push: { status: { status, location } },
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedParcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    const subject = "Update on Your Golden Airways Courier Shipment";
    const text = `
Dear Customer 👋🏻,

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

    // Send the email notification
    await sendEmail(updatedParcel.recipientEmail, subject, text);

    res.status(200).json({ message: "Parcel status updated", updatedParcel });
  } catch (error) {
    console.error("Error updating parcel status:", error);
    res.status(500).json({ error: "Failed to update parcel status" });
  }
};

// Get parcel status
const getParcelStatus = async (req, res) => {
  try {
    console.log("Get parcel status endpoint called with params:", req.params);

    const parcel = await Parcel.findOne({
      trackingNumber: req.params.trackingNumber,
    });

    if (!parcel) {
      console.log("Parcel not found:", req.params.trackingNumber);
      return res.status(404).json({ error: "Parcel not found" });
    }

    if (!parcel.status || parcel.status.length === 0) {
      return res.status(400).json({ error: "No status available for this parcel" });
    }

    const latestStatus = parcel.status[parcel.status.length - 1];
    console.log("Latest status:", latestStatus);

    if (!latestStatus || !latestStatus.status || !latestStatus.location) {
      return res.status(500).json({ error: "Invalid status data for this parcel" });
    }

    await sendParcelStatusEmail(parcel.recipientEmail, parcel.trackingNumber, latestStatus.status, latestStatus.location);

    res.status(200).json({
      trackingNumber: parcel.trackingNumber,
      latestStatus: latestStatus,
    });

    console.log("Parcel status viewed and emailed", latestStatus);
  } catch (error) {
    console.error("Error retrieving parcel status:", error);
    res.status(500).json({ error: "Failed to retrieve parcel status", details: error.message });
  }
};

// Send parcel status email
const sendParcelStatusEmail = async (recipientEmail, trackingNumber, status, location) => {
  try {
    const subject = "Your Shipment Status Update";
    const text = `
Dear Customer ⚡,

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

    // Send email notification
    await sendEmail(recipientEmail, subject, text);

    console.log("Status email sent successfully to:", recipientEmail);
  } catch (error) {
    console.error("Error sending status email:", error);
  }
};

module.exports = {
  createParcel,
  updateParcelStatusById,
  getParcelStatus,
};
