const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");

router.post("/api/add/user", userController.addUserApi);
router.get("/api/user/:user_id/tasks", userController.getUserWithTasksApi);

module.exports = router;
