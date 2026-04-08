const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Roadmap = sequelize.define("UserTopicProgress", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  topicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Roadmap;
