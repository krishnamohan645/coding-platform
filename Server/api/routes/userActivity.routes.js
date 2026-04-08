const router = require("express").Router();
const userActivityController = require("../controllers/userActivity.controller");
const auth = require("../middlewares/auth");

router.post("/activity/init", auth, userActivityController.getOrCreateActivity);
router.post("/activity/run", auth, userActivityController.runCode);
router.post("/activity/submit", auth, userActivityController.submitCode);
// router.get(
//   "/activity/:userId/:problemId",
//   userActivityController.getUserProblemActivity
// );
router.post("/activity/reset", auth, userActivityController.resetActivity);
router.get("/stats", auth, userActivityController.getUserStats);

module.exports = router;
