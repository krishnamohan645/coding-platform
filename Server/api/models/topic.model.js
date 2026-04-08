const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Topic = sequelize.define("Topic", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  languageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Topic;
