const express = require("express");
const sequelize = require("./config/database");
const defineAssociations = require("./api/init_Models/associations");
const db = require("./api/models/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : [
          "http://localhost:5173",
          "https://coding-platform-kohl-two.vercel.app",
          "https://judge029.p.rapidapi.com/submissions",
        ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  }),
);

app.options("*", cors()); // handle preflight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
defineAssociations(db);

app.use("/api/languages", require("./api/routes/language.routes"));
app.use("/api/topics", require("./api/routes/topic.routes"));
app.use("/api/subtopics", require("./api/routes/subtopic.routes"));
app.use("/api/contents", require("./api/routes/content.routes"));
app.use("/api/problem", require("./api/routes/problem.routes"));
app.use("/api/user", require("./api/routes/user.routes"));
app.use("/api/auth", require("./api/routes/auth.routes"));
app.use(
  "/api/practiceProblems",
  require("./api/routes/practiceProblems.routes"),
);
app.use("/api/userActivity", require("./api/routes/userActivity.routes"));
app.use("/api/ai", require("./api/routes/ai.routes"));
app.use(require("./api/middlewares/errorHandler"));

sequelize.sync().then(() => {
  console.log("🟢 DB Synced");
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
