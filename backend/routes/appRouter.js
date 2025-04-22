const express = require("express");
const router = express.Router();

//controllers
const {
  category,
  items,
  register,
  login,
  getUser,
} = require("../controllers/appController");

//middleware
const { isAuthenticate } = require("../middleware.js");

router.get("/category", category);
router.get("/items", items);
router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", isAuthenticate, getUser);

module.exports = router;
