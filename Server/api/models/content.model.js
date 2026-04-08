const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Content = sequelize.define("Content", {
  title: DataTypes.STRING,
  explanation: DataTypes.TEXT,
  examples: DataTypes.JSON,
  interactiveCode: DataTypes.TEXT,
  subtopicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Content;
