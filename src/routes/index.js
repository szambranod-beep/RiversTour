const express = require("express");
const router = express.Router();

const apiKeyMiddleware = require("../middlewares/apiKey.middleware");

// 🔥 proteger TODA la API con API KEY
router.use(apiKeyMiddleware);

router.use("/auth", require("./auth.routes"));
router.use("/tours", require("./tours.routes"));
router.use("/orders", require("./orders.routes"));

module.exports = router;




