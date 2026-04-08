const router = require("express").Router();
const ctrl = require("../controllers/content.controller");

console.log('ctrl keys ->', Object.keys(ctrl));
console.log('types:', {
  getAllContents: typeof ctrl.getAllContents,
  getContent: typeof ctrl.getContent,
  createContent: typeof ctrl.createContent,
  updateContent: typeof ctrl.updateContent,
  deleteContent: typeof ctrl.deleteContent,
});

router.get("/get-content", ctrl.getAllContents);
router.get("/:id", ctrl.getContent);
router.post("/create-content", ctrl.createContent);
router.put("/:id", ctrl.updateContent);
router.delete("/:id", ctrl.deleteContent);
router.get("/get-content-by-subtopic/:id", ctrl.getContentBySubtopicId);

module.exports = router;
