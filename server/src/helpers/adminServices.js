const Admin = require("../models/adminModel");

/**
 * Finds a user by their email
 * @param {string} email - The user's email
 * @returns {Promise<Admin|null>} The user object if found, otherwise null
 */
const findAdminByEmail = async (email) => {
  const admin = await Admin.findOne({ email });

  return admin;
};

const findAdminByToken = async (token) => {
  const admin  = await Admin.findOne({ verificationToken: token });

  return admin;
};

const findAdminById = async (userId) => {
  const admin = await Admin.findById(adminId)
    .select("-password")
    .select("-verificatioTokenExpires");

  return admin;
};

module.exports = { findAdminByEmail, findAdminByToken, findAdminById };
