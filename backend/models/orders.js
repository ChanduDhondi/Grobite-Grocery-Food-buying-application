const mongoose = require("mongoose");

const ordersSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Canceled"],
  },
  items: [
    {
      itemId: String,
      name: String,
      price: mongoose.Types.Decimal128,
      quantity: Number,
    },
  ],
  totalPrice: mongoose.Types.Decimal128,
});

const Orders = mongoose.model("Orders", ordersSchema);

module.exports = Orders;
