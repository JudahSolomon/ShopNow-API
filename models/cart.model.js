// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  // Add any other fields you need for your cart
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
