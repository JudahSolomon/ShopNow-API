const productModel = require("../models/products.model");
const fs = require("fs");

class ProductService {
  // creating a fun to handle adding products
  static async addProduct(
    name,
    description,
    price,
    countInStock,
    createdAt,
    category,
    rating,
    image
  ) {
    try {
      const newProduct = new productModel({
        name,
        description,
        price,
        createdAt: new Date(),
        countInStock,
        category,
        rating,
        image,
      });
      return await newProduct.save();
    } catch (error) {
      throw error;
    }
  }
  //get the list of all the products

  /**
   * Query for users
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  static async getAllProducts(filter, options) {
    const products = await productModel.paginate(filter, options);
    return products;
    // const products = await productModel.find().sort({ createdAt: -1 });
    // res.status(200).json(products);
  }

  //get a product by its ID
  static async getProductById(productId) {
    try {
      const product = await productModel.findById(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  // DELETE PRODUCT
  static async deleteProduct(productId) {
    try {
      const deleteProduct = await productModel.findByIdAndDelete({
        productId,
      });

      res.status(200).json(deleteProduct);
    } catch (error) {
      throw error;
    }
  }

  // SEARCH PRODUCTS
  static async searchProduct(req, res, next) {
    try {
      const results = productModel.aggregate([
        [
          {
            $search: {
              index: "search",
              text: {
                query: "bag",
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ],
      ]);
      res.status(200).json(results);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductService;
