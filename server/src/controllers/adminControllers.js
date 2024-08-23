const  Admin = require("../models/adminModel");
const { sendVerificationEmail } = require("../helpers/emailServices");
const { generateOTP } = require("../helpers/randomOtpGenerator");
const { hashPassword } = require("../helpers/passwordHelpers");

//import my user services
const { findAdminByEmail, findAdminById, findAdminByToken } = require("../helpers/adminServices");

//create a new Admin instance
const createNewAdmin = async (req, res) => {
    try {
        console.log("Creating a new admin...");
        //get the user data from the request body
        const {userName, email, password } = req.body;

        console.log("Getting existing admin by email...");
        const adminExists = await findAdminByEmail(email);


        if (adminExists) {
            console.log("Admin with this email already exists.");
            if (!adminExists.isVerified) {
                console.log("Sending verification email...");
                //send a verification email to the user with the token for verification
                // await sendVerificationEmail(
                //   userExists.email,
                //   userExists.verificationToken
                // );
                return res
                  .status(200)
                  .json({ message: "Check your email to complete verification" });
            }
            console.log("Admin with this email is already verified.");
            return res
              .status(403)
              .json({ error: "User with this Email Already Exists" });
        }

        console.log("Generating a verification token...");
        // executing the generate a random token function
        const verificationToken = generateOTP();

        console.log("Creating a new admin instance...");
        //create a new user instance
        const admin = new Admin({ userName, email, password, verificationToken });
        //save the Admin  to the database by using the save method from mongoose

        await admin.save();
        console.log("Saving admin to the database...");
        //check if the user is created successfully
        if (!admin) {
            console.log("Admin not created.");
            return res.status(400).json({ error: "Admin Not Created!!" });
        }

        console.log("Sending verification email...");
        //send a verification email to the admin
        await sendVerificationEmail(admin.email, admin.verificationToken);

        console.log("Admin created successfully.");
        //send a response to the client if the user is created successfully
        return res.status(201).json({ message: "Admin Created Successfully" });

        //catch any error that occurs and send a response to the client
    } catch (error) {
        console.log("Error creating admin:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
  
  const verifyAdmin = async (req, res) => {
    try {
      //get the verification token from the request body or request params  
      const { verificationToken } = req.body;
  
      const adminWithTokenExists = await findAdminByToken(verificationToken);
  
  
      if (!adminWithTokenExists) {
        return res.status(404).json({ error: "Invalid Token" });
  
    }
    adminWithTokenExists.isVerified = true;
  
  await adminWithTokenExists.save();
  
  return res.status(200).json({ message: "Admin Verified Successfully" });
  
  }catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
  
  };
  
  //create a new password
  const resetPassword = async (req, res) => {
    try {
      //get the user data from the request body
  
      const { verificationToken, password } = req.body;
      const admin = await findAdminByToken(verificationToken);
  
  
      if (!admin) {
        return res.status(404).json({ error: "User not found" });
      }
  
      if (!admin.isVerified ) {
        return res.status(403).json({ error: "User Is not Verified" });
      }
    
  //update the user password
  const hashedPassword = hashPassword(password);
    //set the new password to the user password
  admin.password = hashedPassword;
  //set the verification token to undefined
  admin.verificationToken = undefined;
  await admin.save();
  return res.status(200).json({ message: "Password Updated Successfully" });
    
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  
  //get the current Admin
  const getCurrentAdmin = async (req, res) => {
    try {
      //get the user id from the request object
      const { adminId } = req.admin;
  
      //find the user by id
      const admin = await findUserById(adminId);
  
  //check if the user exists
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      //send a response to the client if the user is found
      return res.status(200).json({message:"Admin Found", admin });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
  
  
  
  
  module.exports = { createNewAdmin, verifyAdmin, resetPassword, getCurrentAdmin };
  