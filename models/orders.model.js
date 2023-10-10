const mongoose = require("mongoose");

// Define the Cart Schema
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },

    productId: {
      type: mongoose.Types.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      default: "pending",
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a Product model based on the schema
const orderModel = mongoose.model("Orders", orderSchema);
module.exports = orderModel;
