const express = require("express");
const router = express.Router();

const controller = require("../controllers/tours.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// públicos
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// solo admin
router.post(
"/",
authMiddleware,
roleMiddleware("admin"),
controller.create
);

router.put(
"/:id",
authMiddleware,
roleMiddleware("admin"),
controller.update
);

router.delete(
"/:id",
authMiddleware,
roleMiddleware("admin"),
controller.remove
);

module.exports = router;
