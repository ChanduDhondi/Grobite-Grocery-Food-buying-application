const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["successful", "Delivered", "Canceled"],
  },
  items: [
    {
      itemId: String,
      name: String,
      price: mongoose.Types.Decimal128,
    },
  ],
  totalPrice: mongoose.Types.Decimal128,
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
