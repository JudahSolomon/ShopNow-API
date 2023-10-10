const router = require("express").Router();
const ordersController = require("../controllers/orders.controller");

// defining the routes for user registration, login and logout

router.get("/api/v1/orders", ordersController.userOrders);

module.exports = router;
