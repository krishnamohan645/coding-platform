const router = require("express").Router();
const ctrl = require("../controllers/language.controller");
const auth = require("../middlewares/auth");

router.get("/get-languages", ctrl.getAllLanguages);
router.get("/get-languages/:id", ctrl.getLanguage);
router.post("/create-language", ctrl.createLanguage);
router.put("/update-languages/:id", ctrl.updateLanguage);
router.delete("/delete-languages/:id", ctrl.deleteLanguage);
router.get("/roadmap", auth, ctrl.getLanguagesForRoadmap);
router.post("/roadmap/topic/toggle", auth, ctrl.toggleTopicCompletion);

module.exports = router;
