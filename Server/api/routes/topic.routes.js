const router = require("express").Router();
const ctrl = require("../controllers/topic.controller");

router.get("/get-topics", ctrl.getAllTopics);
router.get("/get-topics/:id", ctrl.getTopic);
router.post("/create-topic", ctrl.createTopic);
router.put("/:id", ctrl.updateTopic);
router.delete("/:id", ctrl.deleteTopic);

module.exports = router;