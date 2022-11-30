const express = require("express");
const router = express.Router();

// API Label
router.get("/label", (req, res) => res.send("Ecom API"));

router.use("/product", require("./productRoutes"));
router.use("/user", require("./userRoutes"));

module.exports = router;
