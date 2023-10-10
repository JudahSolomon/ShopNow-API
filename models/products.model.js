const mongoose = require("mongoose");
const { paginate } = require("./models.plugin");

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure the price is non-negative
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  { Timestamp: true }
);
// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
productSchema.plugin(paginate);
// Create a Product model based on the schema
const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
