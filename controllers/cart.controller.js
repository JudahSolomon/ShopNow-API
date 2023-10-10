// controllers/cartController.js
const cartService = require("../services/cart.services");

exports.addToCart = async (req, res) => {
  const { cartId, productId, quantity } = req.body;

  try {
    const updatedCart = await cartService.addItemToCart(
      cartId,
      productId,
      quantity
    );
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCartItem = async (req, res) => {
  const { cartItemId } = req.params.id;
  try {
    const cart = await cartService.getCartItem(cartItemId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
    const isDeleted = await cartService.deleteCartItem(cartItemId);
    console.log(isDeleted);
    res.status(200).json({
      message: "Item deleted successfully...",
      cartItemId: cartItemId,
    });
  } catch (err) {
    res.status(404).json({ message: "Item not found in the cart" });
  }
};
