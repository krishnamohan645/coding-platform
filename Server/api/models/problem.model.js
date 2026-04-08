const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Problems = sequelize.define("Problems", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  constraints: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  examples: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  hints: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  subTopicId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  template: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  testCases: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  acceptance: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  frequency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companies: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  // solved: {
  //   type: DataTypes.BOOLEAN,
  // },
  // attempted: {
  //   type: DataTypes.BOOLEAN,
  // },
});

module.exports = Problems;
