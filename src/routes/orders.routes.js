const express = require("express");
const router = express.Router();

const controller = require("../controllers/orders.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// crear reserva
router.post("/", authMiddleware, controller.create);

// ver mis reservas
router.get("/my-orders", authMiddleware, controller.getMyOrders);

module.exports = router;
