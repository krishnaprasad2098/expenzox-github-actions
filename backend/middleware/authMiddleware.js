const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.protect = async (req, res, next) => {

  let token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token);
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();

  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
