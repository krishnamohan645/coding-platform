const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = async (Email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: Email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP code is <b>${otp}</b></h2><p>Valid for 10 minutes.</p>`,
  });
};
