const router = require("express").Router();
const ctrl = require("../controllers/subtopic.controller");

router.get("/get-subtopics", ctrl.getAllSubtopics);
router.get("/get-subtopics/:id", ctrl.getSubtopic);
router.post("/create-subtopic", ctrl.createSubtopic);
router.put("/:id", ctrl.updateSubtopic);
router.delete("/:id", ctrl.deleteSubtopic);

module.exports = router;