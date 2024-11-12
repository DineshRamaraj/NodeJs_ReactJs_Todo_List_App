const rateLimit = require("express-rate-limit");
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "Too many registration attempts from this IP, please try again later.",
});

module.exports = registerLimiter;
