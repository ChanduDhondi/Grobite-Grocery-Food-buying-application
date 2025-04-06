const Category = require("../models/category.js");
const Items = require("../models/items.js");

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

module.exports = { category, items };
