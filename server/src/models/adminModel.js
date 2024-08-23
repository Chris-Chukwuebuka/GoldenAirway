const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,  
    default: false,
},
  verificationToken: {
    type: String,
  },
  verificatioTokenExpires: {
    type: Date,
    default: Date.now(),
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

// // Admin Route
// const express = require("express");
// const router = express.Router();
// const { createAdmin, getAdmin, getAllAdmins } = require("../controllers/adminControllers");

// router.post("/", createAdmin);
// router.get("/", getAdmin);
// router.get("/all", getAllAdmins);

// module.exports = router;

// // Admin Controller
// const Admin = require("../models/adminModel");

// // Create Admin
// const createAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.create(req.body);
//     res.status(201).json(admin);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get Admin
// const getAdmin = async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.params.id);
//     res.status(200).json(admin);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get All Admins
// const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find();
//     res.status(200).json(admins);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// module.exports = { createAdmin, getAdmin, getAllAdmins };
