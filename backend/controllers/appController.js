require("dotenv").config();
const Category = require("../models/category.js");
const Items = require("../models/items.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const Orders = require("../models/orders.js");

const category = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (err) {
    console.log("Error while fetching Categories", err.message);
    res.status(500).json({
      message: "Connection Error while fetching Categories",
      error: err.message,
    });
  }
};

const items = async (req, res) => {
  try {
    const items = await Items.find().populate("category");
    res.status(200).json(items);
  } catch (err) {
    console.log("Error while fetching Items", err.message);
    res.status(500).json({
      message: "Connection Error while fetching Categories",
      error: err.message,
    });
  }
};

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone)
    return res
      .status(401)
      .json({ error: "Required fields: Name, Email, Password, Phone" });

  try {
    const existing = await User.findOne({ email: email });
    if (existing)
      return res.status(409).json({ error: "User already exists with Email" });

    const hashed = await bcrypt.hash(password, 10);
    const response = await User.insertOne({
      name: name,
      email: email,
      password: hashed,
      phone: phone,
    });
    res.status(201).json({ message: "User Registered successfully", response });
  } catch (err) {
    console.log("Error while registering User", err.message);
    res.status(500).json({
      message: "Connection error while registering User",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password))
    return res.status(401).json({ error: "Required fields: Email, Password" });

  try {
    const data = await User.findOne({ email: email });
    if (!data)
      return res
        .status(404)
        .json({ error: `User not exists with email: ${email}` });
    const hashed = data.password;
    const response = await bcrypt.compare(password, hashed);
    if (!response)
      return res.status(404).json({ error: "Entered wrong password" });

    const token = jwt.sign(
      { email: email, id: data._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "7 days",
      }
    );
    res.status(200).json({ message: "User login successfully", token });
  } catch (err) {
    console.log("Error while login User", err.message);
    res.status(500).json({
      message: "Connection error while login User",
      error: err.message,
    });
  }
};

const createOrder = async (req, res) => {
  const { status, items, totalPrice, userId } = req.body;
  if (!status || !items || !totalPrice || !userId)
    return res
      .status(401)
      .json({ error: "Required Fields: Status, Items, totalPrice, UserId" });

  console.log(status, items, totalPrice, userId);
  try {
    await Orders.insertOne({
      status,
      items,
      totalPrice,
      user: userId,
    });
    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    console.log("Error while creating Order", err.message);
    res.status(500).json({
      message: "Connection error while creating order",
      error: err.message,
    });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.userId;

  try {
    const user = await User.findById({ _id: userId }).populate("orders");
    res.status(200).json({ message: "User details", user });
  } catch (err) {
    console.log("Error while getting User", err.message);
    res
      .status(500)
      .json({ message: "Connection error while getuser", error: err.message });
  }
};

module.exports = { category, items, register, login, createOrder, getUser };
