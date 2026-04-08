const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Language = sequelize.define("Language", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  color: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gradient: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  judge0_id:{
    type: DataTypes.INTEGER,
    allowNull: true,
  }
});

module.exports = Language;
