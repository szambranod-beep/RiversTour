const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// login (no requiere sesión)
router.post("/login", controller.login);

// logout (requiere estar logueado)
router.post("/logout", authMiddleware, controller.logout);

module.exports = router;
