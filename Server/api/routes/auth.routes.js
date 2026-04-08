const { sendOtp, verifyOtp } = require("../controllers/auth.controller");
const { rateLimiter } = require("../middlewares/rateLimiter");
const logout = require("../controllers/auth.controller");

const {
  validateSendOtp,
  validateVerifyOtp,
} = require("../middlewares/validateAuth");
const router = require("express").Router();

router.post("/send-otp", rateLimiter, validateSendOtp, sendOtp);
router.post("/verify-otp", validateVerifyOtp, verifyOtp);
router.post(
  "/google-login",
  require("../controllers/googleAuth.controller").googleLogin
);
router.post("/logout", logout.logoutUser);
module.exports = router;
