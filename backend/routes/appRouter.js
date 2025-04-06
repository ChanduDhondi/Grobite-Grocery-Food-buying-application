const express = require("express");
const router = express.Router();

//controllers
const { category, items } = require("../controllers/appController");

router.get("/category", category);
router.get("/items", items);

module.exports = router;
