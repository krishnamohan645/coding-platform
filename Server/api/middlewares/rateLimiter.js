const rateLimit = require("express-rate-limit");

exports.rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: "Too many OTP requests",
});
