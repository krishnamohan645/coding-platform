const { OAuth2Client } = require("google-auth-library");
const Users = require("../models/users.model");
require("dotenv").config();
const generateToken = require("../../config/jwt");
const { authCookieOptions } = require("../utils/cookieOptions");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    let user = await Users.findOne({ where: { email } });

    if (user) {
      if (!user.googleId) {
        await user.update({
          isEmailVerified: true,
          authProvider: "google",
          googleId,
          name,
        });
      }
    } else {
      user = await Users.create({
        email,
        googleId,
        isEmailVerified: true,
        authProvider: "google",
        name,
      });
    }
    const token = generateToken(user.id);
    console.log(token, "token");

    res.cookie("token", token, authCookieOptions);
   

    res.status(200).json({
      message: "Google login successful",
      user,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Account already exists with this email",
      });
    }
    next(error);
  }
};
