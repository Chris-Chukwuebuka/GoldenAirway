const Parcel = require("../models/parcelModel");
const generateTrackingNumber = require("../helpers/generateTrackingNumber");
const { sendEmail } = require("../helpers/emailServices");

// Helper function to send parcel status email
const sendParcelStatusEmail = async (
  sendersName,
  sendersEmail,
  sendersAddress,
  recipientEmail,
  trackingNumber,
  status,
  location,
  time
) => {
  try {
    const subject = "Your Shipment Status Update";
    const text = `
Dear Customer,

Here is the latest status of your shipment:

Sender's Name: ${sendersName}
Sender's Address: ${sendersAddress}
Sender's Email: ${sendersEmail}

Tracking Number: ${trackingNumber}
Current Status: ${status}
Location: ${location}
Time: ${time}

You can continue to monitor the status of your shipment on our website.

Thank you for choosing Golden Airways Courier.

Sincerely,

Golden Airways Courier Support Team
support@yourcompany.com
+44 7543878790
    `;

    await sendEmail(recipientEmail, subject, text);
    console.log("Status email sent successfully to:", recipientEmail);
  } catch (error) {
    console.error("Error sending status email:", error);
  }
};

// Create a new parcel
const createParcel = async (req, res) => {
  const {
    email,
    quantity,
    weight,
    length,
    width,
    height,
    location,
    sendersName,
    sendersAddress,
    sendersEmail,
    receiversName,
    receiversAddress,
  } = req.body;

  if (
    !email ||
    !quantity ||
    !weight ||
    !length ||
    !width ||
    !height ||
    !location ||
    !sendersName ||
    !sendersAddress ||
    !sendersEmail ||
    !receiversName ||
    !receiversAddress
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const trackingNumber = generateTrackingNumber();

    const parcel = new Parcel({
      trackingNumber,
      email,
      quantity,
      weight,
      dimensions: { length, width, height },
      status: {
        status: "Shipment Created",
        location,
        time: "00:00",
        timestamp: Date.now(),
      },
      sendersName,
      sendersAddress,
      sendersEmail,
      receiversName,
      receiversAddress,
      paymentMethod: "---------",
    });

    await parcel.save();
    console.log("Parcel saved successfully");

    const subject = "Shipment Notification";
    const text = `
Dear Customer,

Your shipment has been successfully created. Below are the details of your shipment from Golden Airways Courier:

Sender's Name: ${sendersName}
Sender's Address: ${sendersAddress}
Sender's Email: ${sendersEmail}

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

    await sendEmail(email, subject, text);
    console.log("Notification email sent successfully");

    res.status(201).json({ message: "Parcel created", trackingNumber });
  } catch (error) {
    console.error("Error creating parcel:", error);
    res.status(500).json({ error: "Failed to create parcel" });
  }
};

// Update parcel status by ID
const updateParcelStatusById = async (req, res) => {
  const { _id } = req.params;
  const { status, location, time } = req.body;

  if (!status || !location || !time) {
    return res.status(400).json({ error: "Status, location, and time are required" });
  }

  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(
      _id,
      {
        status: { status, location, time, timestamp: Date.now() },
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
Updated Time: ${time}

Thank you for choosing Golden Airways Courier.

Sincerely,

Golden Airways Courier Support Team
support@yourcompany.com
+44 7543878790
    `;

    await sendEmail(updatedParcel.email, subject, text);
    console.log("Update email sent successfully");

    res.status(200).json({ message: "Parcel status updated", updatedParcel });
  } catch (error) {
    console.error("Error updating parcel status:", error);
    res.status(500).json({ error: "Failed to update parcel status" });
  }
};

// Get parcel status
const getParcelStatus = async (req, res) => {
  try {
    const parcel = await Parcel.findOne({ trackingNumber: req.params.trackingNumber });

    if (!parcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    if (!parcel.status) {
      return res.status(400).json({ error: "No status available for this parcel" });
    }

    await sendParcelStatusEmail(
      parcel.sendersName,
      parcel.sendersEmail,
      parcel.sendersAddress,
      parcel.email,
      parcel.trackingNumber,
      parcel.status.status,
      parcel.status.location,
      parcel.status.time
    );

    res.status(200).json({ trackingNumber: parcel.trackingNumber, status: parcel.status });
  } catch (error) {
    console.error("Error retrieving parcel status:", error);
    res.status(500).json({ error: "Failed to retrieve parcel status" });
  }
};

// Get all parcels
const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.status(200).json({ parcels });
  } catch (error) {
    console.error("Error retrieving all parcels:", error);
    res.status(500).json({ error: "Failed to retrieve parcels" });
  }
};

// Delete parcel by ID
const deleteParcelById = async (req, res) => {
  const { _id } = req.params;

  try {
    const deletedParcel = await Parcel.findByIdAndDelete(_id);

    if (!deletedParcel) {
      return res.status(404).json({ error: "Parcel not found" });
    }

    console.log("Parcel deleted successfully");
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
