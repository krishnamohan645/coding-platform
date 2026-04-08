const router = require("express").Router();
const practiceProblemsController = require("../controllers/practiceProblems.controller");

router.post(
  "/create-practice-problems",
  practiceProblemsController.createPracticeProblems
);
router.get(
  "/get-practice-problems",
  practiceProblemsController.getAllPracticeProblems
);
router.get("/get-practice-problems/:id", practiceProblemsController.getPracticeProblems)

module.exports = router;
