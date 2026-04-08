const router = require("express").Router();
const getUsersController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.get("/get-users", getUsersController.getUsers);
router.get("/get-users/:id", getUsersController.getUserById);
router.get("/me", auth, getUsersController.getMe);

module.exports = router;
