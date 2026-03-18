const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel"); 

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Get token from "Bearer <token>"
      //console.log("Token received:", token);
      //console.log("Secret check:", process.env.JWT_SECRET); // If this says 'undefined', that's the problem!

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("Decoded ID:", decoded.id); // If this doesn't print, the error is here
      
      // Attach user to request (excluding password)
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      //console.error("JWT Error:", error.message); // This will tell you if it's "expired" or "invalid signature"
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };