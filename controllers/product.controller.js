const productModel = require("../models/products.model");
const productService = require("../services/products.services");
const pick = require("../utils/pick");

// controller function to handle user registration
exports.addNewProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      countInStock,
      createdAt,
      category,
      rating,
      image,
    } = req.body;
    const newProduct = await productService.addProduct(
      name,
      description,
      price,
      countInStock,
      createdAt,
      category,
      rating,
      image
    );

    // Save the product to the database
    res.json({
      status: true,
      success: "New Product Added",
      body: newProduct,
    });
  } catch (error) {
    throw error;
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Save the product to the database
    res.json({
      status: true,
      success: "Product gotten by ID",
      body: product,
    });
  } catch (error) {
    throw error;
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const filter = pick(req.query, ["productname", "role"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const Products = await productService.getAllProducts(filter, options);

    // Save the product to the database
    res.json({
      status: true,
      success: "New Product Added",
      body: Products,
    });
  } catch (error) {
    throw error;
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const Products = await productService.searchProduct();
    // Save the product to the database
    res.json({
      status: true,
      success: "New Product Added",
      body: Products,
    });
  } catch (error) {
    throw error;
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const Products = await productService.deleteProduct(productId);

    // Save the product to the database
    res.json({
      status: true,
      success: "Product Deleted",
      body: Products,
    });
  } catch (error) {
    throw error;
  }
};
