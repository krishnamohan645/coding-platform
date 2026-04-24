const express = require("express");
const sequelize = require("./config/database");
const defineAssociations = require("./api/init_Models/associations");
const db = require("./api/models/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = (
  process.env.CORS_ORIGIN ||
  "http://localhost:5173,https://coding-platform-kohl-two.vercel.app"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    const requestOrigin = origin?.replace(/\/$/, "");

    if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
};

app.use(cors(corsOptions));

// app.options("*", cors()); // handle preflight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
defineAssociations(db);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

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
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
