const userModel = require("../models/user.model");
const Userservice = require("../services/user.services");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { authSchema } = require("../validators/validator");
const { loginSchema } = require("../validators/validator");
const { accessTokenSchema } = require("../validators/validator");

// controller function to handle user registration
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validate the registration data using authSchema
    const { error } = authSchema.validateAsync({
      email,
      password,
      username,
      role: "user",
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Registration data is valid, proceed with registration logic
    const successRes = await Userservice.registerUser(
      username,
      email,
      password
    );

    res.json({
      status: true,
      success: "User registration successful",
      body: successRes,
    });
  } catch (err) {
    throw err;
  }
};

// controller function to handle user login

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate the login data using loginSchema
    const { error } = loginSchema.validateAsync({
      username,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user with this username exists
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let tokenData = { _id: user._id, username: user.password };
    const token = await Userservice.generateToken(tokenData, "secretKey", "1h");

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// validating access token

exports.validateAccessToken = async (req, res, next) => {
  try {
    const { accessToken } = req.body;

    // Validate the access token using accessTokenSchema
    const { error } = accessTokenSchema.validateAsync({
      accessToken,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Verify the access token
    jwt.verify(accessToken, "secretKey", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token" });
      }

      // Access token is valid, you can access `decoded` object for further information
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Access token validation error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
