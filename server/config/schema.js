const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  amount: Number,
  currency: String,
  email: String,
  description: String,
  paymentStatus: {
    type: String,
    default: "paid",
  },
  sessionId: String,
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);