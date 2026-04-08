const Users = require("../models/users.model");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await Users.findAll({
      attributes: { include: ["id", "email", "name", "authProvider"] },
    });
    console.log(users);
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await Users.findByPk(userId, {
      attributes: ["id", "email", "name", "authProvider"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      authProvider: req.user.authProvider,
    },
  });
};
