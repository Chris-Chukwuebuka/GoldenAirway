const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  address: { type: String },
  sendersName: { type: String },
  sendersAddress: { type: String },
  sendersEmail: { type: String },
  receiversName: { type: String },
  receiversAddress: { type: String },
  receiversNumber: { type: Number },
  paymentMethod: {
    type: String,
  },
  status: {
    status: String,
    timestamp: { type: Date, default: Date.now },
    location: String,
    time: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
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
