const nodemailer = require("nodemailer");

// Create a transporter using Zoho SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465, // Use 587 for TLS if needed
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Your Zoho password or app-specific password
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: `"Golden Airways Courier" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log("Email sent:", info.response);
    })
    .catch(error => {
      console.error("Error sending email:", error);
      throw error; // rethrow error to allow further handling
    });
};

const sendVerificationEmail = (email, token) => {
  const mailOptions = {
    from: `"Golden Airways Courier" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Email Verification",
    html: `
      <h4>Please click the following link to verify your email address:</h4>
      <p>Use the token below to verify your account:</p>
      <h1>${token}</h1>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log("Verification email sent:", info.response);
    })
    .catch(error => {
      console.error("Error sending verification email:", error);
      throw error; // rethrow error to allow further handling
    });
};

module.exports = { sendEmail, sendVerificationEmail };
