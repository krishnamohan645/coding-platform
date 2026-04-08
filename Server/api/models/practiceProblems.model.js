const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const PracticeProblems = sequelize.define("PracticeProblems", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  difficulty: {
    type: DataTypes.ENUM("easy", "medium", "hard"),
    allowNull: true,
  },
  examples: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  contentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = PracticeProblems;
