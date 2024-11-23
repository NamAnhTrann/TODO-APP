const express = require("express");
const router = express.Router();
const taskController = require("../controller/task_controller");

router.post("/api/add/task/:user_id", taskController.addTaskApi);
router.get("/api/list/task", taskController.listTaskApi);
router.delete("/api/remove/task", taskController.removeTaskApi);
router.put("/api/update/task/:task_id", taskController.updateTaskApi);
module.exports = router;
