const express = require("express");
const router = express.Router();

const { requireApiKey } = require("../middlewares/apiKey.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const auth = require("../controllers/auth.controller");
const products = require("../controllers/tours.controller");
const orders = require("../controllers/orders.controller");

router.get("/health", (req, res) => {
  res.json({ ok: true, data: { status: "ok" } });
});

// Auth público
router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);
router.post("/terms", terms.getTerms);

// Auth protegido
router.post("/auth/logout", requireApiKey, auth.logout);

// Productos: clientes y admin pueden consultar
router.get("/tours", requireApiKey, products.list);
router.get("/tours/:id", requireApiKey, products.getById);

// Productos: solo admin puede administrar
router.post("/tours", requireApiKey, requireRole("admin"), products.create);
router.patch("/tours/:id", requireApiKey, requireRole("admin"), products.update);
router.delete("/tours/:id", requireApiKey, requireRole("admin"), products.remove);

/*
// Carrito: solo client
router.post("/cart/items", requireApiKey, requireRole("client"), cart.addItem);
router.get("/cart", requireApiKey, requireRole("client"), cart.getCart);
router.delete("/cart/items/:productId", requireApiKey, requireRole("client"), cart.removeItem);
router.delete("/cart/clear", requireApiKey, requireRole("client"), cart.clearCart);
*/

// Órdenes: solo client
router.post("/orders/pay", requireApiKey, requireRole("client"), orders.pay);
router.get("/orders/my", requireApiKey, requireRole("client"), orders.myOrders);

module.exports = router;



