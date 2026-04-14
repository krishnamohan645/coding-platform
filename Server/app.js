const express = require("express");
const sequelize = require("./config/database");
const defineAssociations = require("./api/init_Models/associations");
const db = require("./api/models/index");
require("dotenv").config();

const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://coding-platform-kohl-two.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
  }),
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
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

// console.log(require("crypto").randomBytes(32).toString("hex"))

sequelize.sync().then(() => {
  console.log("🟢 DB Synced");
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT} `);
  });
});
