exports.validateSendOtp = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email))
    return res.status(400).json({ message: "Invalid email" });
  next();
};

exports.validateVerifyOtp = (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ message: "Email & otp required" });

  if (!/^\d{6}$/.test(otp))
    return res.status(400).json({ message: "OTP must be in 6 digits" });

  next();
};
