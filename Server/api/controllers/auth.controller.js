const EmailOtp = require("../models/email.model");
const Users = require("../models/users.model");
const generateToken = require("../../config/jwt");
const sendEmail = require("../utils/sendEmail");
const generateOtp = require("../utils/generateOtp");
const bcrypt = require("bcrypt");

exports.sendOtp = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    console.log(name, "nameeeee");
    const [user] = await Users.findOrCreate({
      where: { email },
      defaults: {
        name: name || null,
        autProvider: "email",
        isEmailVerified: false,
      },
    });

    if (!user.name && name) {
      await user.update({ name });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp.toString(), 10);

    await EmailOtp.destroy({ where: { email } });
    await EmailOtp.create({
      email,
      otpHash,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });
    const displayName = user.name || email.split("@")[0];
    await sendEmail(email, otp, displayName);

    return res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }
    const record = await EmailOtp.findOne({ where: { email } });
    if (!record) return res.status(400).json({ message: "OTP Expired" });

    if (new Date() > record.expiresAt) {
      await record.destroy();
      return res.status(400).json({ message: "OTP Expired" });
    }

    const isValid = await bcrypt.compare(otp, record.otpHash);
    if (!isValid) return res.status(400).json({ message: "Invalid OTP" });

    await Users.update({ isEmailVerified: true }, { where: { email } });

    await record.destroy();

    const user = await Users.findOne({ where: { email } });
    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "OTP verified successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
