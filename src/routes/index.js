const express = require("express");
const router = express.Router();

const { requireApiKey } = require("../middlewares/apiKey.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

// Controllers
const auth = require("../controllers/auth.controller");
const tours = require("../controllers/tours.controller");
const orders = require("../controllers/orders.controller");

// Health check
router.get("/health", (req, res) => {
res.json({ ok: true });
});

// 🔓 AUTENTICACIÓN (público)
router.post("/auth/login", auth.login);

// 🔐 LOGOUT (protegido)
router.post("/auth/logout", requireApiKey, authMiddleware, auth.logout);

// 🌍 TOURS

// Público
router.get("/tours", requireApiKey, tours.getAll);
router.get("/tours/:id", requireApiKey, tours.getById);

// Solo ADMIN
router.post("/tours", requireApiKey, authMiddleware, roleMiddleware("admin"), tours.create);
router.put("/tours/:id", requireApiKey, authMiddleware, roleMiddleware("admin"), tours.update);
router.delete("/tours/:id", requireApiKey, authMiddleware, roleMiddleware("admin"), tours.remove);

// 🧾 ÓRDENES (reservas)

// Usuario crea reserva
router.post("/orders", requireApiKey, authMiddleware, orders.create);

// Ver mis reservas
router.get("/orders/my-orders", requireApiKey, authMiddleware, orders.getMyOrders);

module.exports = router;
