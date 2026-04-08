const router = require("express").Router();
const ctrl = require("../controllers/problem.controller");
const auth = require("../middlewares/auth");

router.get("/getProblems", auth, ctrl.getAllProblems);
router.get("/:id", ctrl.getProblems);
router.post("/", ctrl.createProblem);
router.put("/:id", ctrl.updateProblem);
router.delete("/:id", ctrl.DeleteProblem);

module.exports = router;
