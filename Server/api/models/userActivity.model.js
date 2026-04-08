const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UserActivity = sequelize.define("user_activity", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.ENUM("not_started", "attempted", "solved"),
    allowNull: false,
    defaultValue: "not_started",
  },
  submitted_code: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  submitted_output: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  execution_time_ms: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  practice_problem_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attempts_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  solved_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  last_submitted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  time_spent_seconds: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  code_history: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  problem_type: {
    type: DataTypes.ENUM("practice", "problem"),
    allowNull: true,
  },
});

module.exports = UserActivity;
