const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [2, "Item name must be 2 characters"],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: mongoose.Types.Decimal128,
  },
  stock_quntity: {
    type: mongoose.Types.Decimal128,
  },
  imageUrl: {
    type: String,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
