// const { verifyToken } = require('../helpers/jwtHelpers');

// const requireLogin = (req, res, next) => {
//     try {
//         // Destructure the accessToken from the req.cookies object
//         const { accessToken } = req.cookies;

//         // If there is no accessToken, return an error
//         if (!accessToken) {
//             return res.status(401).json({ error: "Access denied" });
//         }

//         // Verify the Token with the verifyToken helper function
//         const payload = verifyToken(accessToken);

//         // If payload is not returned from the verifyToken function, return error 403
//         if (!payload) {
//             return res.status(403).json({ error: 'Access denied' });
//         }

//         // Attach the payload to the request object
//         req.admin = payload;

//         // Call the next middleware or route handler
//         next();

//     } catch (error) {
//         // Handle any error returned from the jwt verify method
//         console.error(error); // Log the error for debugging
//         return res.status(403).json({ error: 'Invalid or expired token' });
//     }
// };

// module.exports = { requireLogin };
const { verifyToken } = require('../helpers/jwtHelpers');

const requireLogin = (req, res, next) => {
    try {
        // Destructure the accessToken from the req.cookies object
        const { accessToken } = req.cookies;

        // If there is no accessToken, return an error
        if (!accessToken) {
            return res.status(401).json({ error: "Access denied" });
        }

        // Verify the Token with the verifyToken helper function
        const payload = verifyToken(accessToken);

        // If payload is not returned from the verifyToken function, return error 403
        if (!payload) {
            return res.status(403).json({ error: 'Access denied' });
        }

        // Attach the payload to the request object
        req.admin = payload;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle any error returned from the jwt verify method
        console.error(error); // Log the error for debugging
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = { requireLogin };
