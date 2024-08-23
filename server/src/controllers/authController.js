const { findAdminByEmail } = require('../helpers/adminServices');
const { verifyPassword } = require('../helpers/passwordHelpers');

// Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login request received with email:", email);
        const admin = await findAdminByEmail(email);

        if (!admin) {
            console.log("Admin with this email does not exist");
            return res.status(404).json({ error: "Admin with this email does not exist" });
        }

        if (!admin.isVerified) {
            console.log("Admin not verified");
            return res.status(403).json({ error: "Admin not verified" });
        }

        const passwordMatch = verifyPassword(password, admin.password);

        if (!passwordMatch) {
            console.log("Invalid login credentials");
            return res.status(403).json({ error: "Invalid login credentials" });
        }

        req.session = {
            adminId: admin._id,
            email: admin.email,
        };

        console.log("Login successful");
        return res.status(200).json({ message: "Login successful", admin: req.session.admin });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Log out an admin
const logOutAdmin = async (req, res) => {
    try {
      console.log("Logging out admin...");
  
      // Destroy the session
      req.session.destroy((err) => {
        if (err) {
          console.error("Error logging out:", err);
          return res.status(500).json({ error: 'Failed to log out' });
        }
  
        console.log("Logging out successful");
        // Clear the cookie
        res.clearCookie('connect.sid');
  
        return res.status(200).json({ message: 'Logged out successfully' });
      });
    } catch (error) {
      console.error("Error logging out:", error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


// Generate a new session (in case of session expiration or renewal)
const generateNewSession = async (req, res) => {
    try {
        // Check if admin is logged in by checking the session
        if (!req.session.admin) {
            return res.status(403).json({ error: "No active session found" });
        }

        // Re-generate the session ID (to prevent session fixation attacks)
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to regenerate session" });
            }

            return res.status(200).json({ message: "Session renewed successfully", admin: req.session.admin });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { loginAdmin, logOutAdmin, generateNewSession };
