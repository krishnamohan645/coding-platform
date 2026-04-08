const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Subtopic = sequelize.define("Subtopic", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  definition: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  examples: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  interactiveCode: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  topicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
});

module.exports = Subtopic;
