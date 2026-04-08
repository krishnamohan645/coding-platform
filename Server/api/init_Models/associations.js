const defineAssociations = (db) => {
  db.Language.hasMany(db.Topic, { foreignKey: "languageId" });
  db.Topic.belongsTo(db.Language, { foreignKey: "languageId" });

  db.Topic.hasMany(db.Subtopic, { foreignKey: "topicId" });
  db.Subtopic.belongsTo(db.Topic, { foreignKey: "topicId" });

  db.Subtopic.hasMany(db.Content, { foreignKey: "subtopicId" });
  db.Content.belongsTo(db.Subtopic, { foreignKey: "subtopicId" });

  db.Content.hasMany(db.PracticeProblems, { foreignKey: "contentId" });
  db.PracticeProblems.belongsTo(db.Content, { foreignKey: "contentId" });

  // For user activity
  db.Users.hasMany(db.UserActivity, { foreignKey: "user_id" });
  db.UserActivity.belongsTo(db.Users, { foreignKey: "user_id" });

  db.Problems.hasMany(db.UserActivity, { foreignKey: "problem_id" });
  db.UserActivity.belongsTo(db.Problems, { foreignKey: "problem_id" });

  db.Language.hasMany(db.UserActivity, { foreignKey: "language_id" });
  db.UserActivity.belongsTo(db.Language, { foreignKey: "language_id" });

  // ---------- User ↔ Topic (Roadmap Progress) ----------
  db.Users.hasMany(db.Roadmap, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });

  db.Topic.hasOne(db.Roadmap, {
    foreignKey: "topicId",
    as: "progress",
    constraints: false,
  });

  db.Roadmap.belongsTo(db.Users, {
    foreignKey: "userId",
  });

  db.Roadmap.belongsTo(db.Topic, {
    foreignKey: "topicId",
  });
};

module.exports = defineAssociations;
