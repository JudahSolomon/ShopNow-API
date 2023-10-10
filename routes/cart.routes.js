const router = require("express").Router();
const cartController = require("../controllers/cart.controller");

// defining the routes for user registration, login and logout

router.post("/api/v1/add/addtocart", cartController.addToCart);
router.get("/api/v1/get/cartitem/:id", cartController.getCartItem);
router.delete("/api/v1/delete/cartitem/:id", cartController.removeFromCart);

module.exports = router;
