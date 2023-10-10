// Assuming you have a database connection set up
const cartModel = require("../models/cart.model");

class CartService {
  // Create a new order
  static async addItemToCart(cartId, productId, quantity = 1) {
    try {
      let cart = await cartModel.findById(cartId);

      const products = [];
      if (!cart) {
        cart = new cartModel({ _id: cartId, products });
      }

      const productIndex = cart.products.findIndex(
        (product) => product.product === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  // Get
  static async getCartItem(cartId) {
    try {
      const cart = await cartModel.findById(cartId).populate("products").exec();
      return cart;
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // delete Item from cart
  static async deleteCartItem(cartItemId) {
    try {
      const deletedItem = await cartModel.findByIdAndDelete(cartItemId);
      if (deletedItem) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // Handle errors here
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
module.exports = CartService;
