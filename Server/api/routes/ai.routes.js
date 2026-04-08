const router = require("express").Router();
const { generateHint, chatWithAI } = require("../controllers/ai.controller");

router.post("/hint", generateHint);
router.post("/chat", chatWithAI);

module.exports = router;
