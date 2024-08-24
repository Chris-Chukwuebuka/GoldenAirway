const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true,  },
  status: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    location: String,
  }],
  quantity: { type: Number, required: true },
  weight: { type: Number, required: true },
  dimensions: {
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;
