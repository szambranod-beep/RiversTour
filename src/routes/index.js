const express = require("express");
const router = express.Router();

const { requireApiKey } = require("../middlewares/apiKey.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const auth = require("../controllers/auth.controller");
const tours = require("../controllers/tours.controller");
const bookings = require("../controllers/bookings.controller");
const orders = require("../controllers/orders.controller");
const terms = require("../controllers/terms.controller");

router.get("/health", (req, res) => {
  res.json({ ok: true, data: { status: "ok" } });
});

// Auth público
router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);
router.post("/terms", terms.getTerms);

// Auth protegido
router.post("/auth/logout", requireApiKey, auth.logout);

// Tours: clientes y admin pueden consultar
router.get("/tours", requireApiKey, tours.list);
router.get("/tours/:id", requireApiKey, tours.getById);

// Tours: solo admin puede administrar
router.post("/tours", requireApiKey, requireRole("admin"), tours.create);
router.patch("/tours/:id", requireApiKey, requireRole("admin"), tours.update);
router.delete("/tours/:id", requireApiKey, requireRole("admin"), tours.remove);

// Reservas: solo client
router.post("/bookings/items", requireApiKey, requireRole("client"), bookings.addItem);
router.get("/bookings", requireApiKey, requireRole("client"), bookings.getBooking);
router.delete("/bookings/items/:tourId", requireApiKey, requireRole("client"), bookings.removeItem);
router.delete("/bookings/clear", requireApiKey, requireRole("client"), bookings.clearBooking);

// Órdenes: solo client
router.post("/orders/pay", requireApiKey, requireRole("client"), orders.pay);
router.get("/orders/my", requireApiKey, requireRole("client"), orders.myOrders);

module.exports = router;
