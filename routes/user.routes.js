const router = require("express").Router();
const userController = require("../controllers/user.controller");

// defining the routes for user registration, login and logout
router.post("/api/v1/auth/registration", ath(), userController.register);
router.post("/api/v1/auth/login", userController.loginUser);

module.exports = router;
