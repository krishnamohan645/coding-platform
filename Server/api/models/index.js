const sequelize = require("../../config/database");
const Content = require("./content.model");
const Language = require("./language.model");
const PracticeProblems = require("./practiceProblems.model");
const Problems = require("./problem.model");
const Roadmap = require("./roadmap.model");
const Subtopic = require("./subtopic.model");
const Topic = require("./topic.model");
const UserActivity = require("./userActivity.model");
const Users = require("./users.model");

// const language = require("./Language");
// const topic = require("./Topic");
// const subtopic = require("./Subtopic");
// const content = require("./content.model");

const db = {
  sequelize,
  Language,
  Topic,
  Subtopic,
  Content,
  PracticeProblems,
  UserActivity,
  Users,
  Problems,
  Roadmap,
};

module.exports = db;
