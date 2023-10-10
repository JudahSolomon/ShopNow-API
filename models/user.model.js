var mongoose = require("mongoose");
const database = require("../database/db");
const bcrypt = require("bcrypt");
const validator = require("validator");

// creating a Database schema for the user
const userSchema = new mongoose.Schema(
  {
    username: {
      type: "string",
      reuired: [true, "Please enter your username"],
    },

    email: {
      type: "string",
      lowercase: true,
      unique: true,
      required: [true, "Please enter a valid email address"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    password: {
      type: "string",
      reuired: [true, "Please enter a valid password"],
    },
    private: true,
    role: {
      type: "string",
      enum: roles,
      default: false,
    },
  },
  { timestamps: true }
);

// Hashing the user's password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
});

// now encrypting the user password
try {
  userSchema.pre("save", async function () {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
  });
} catch (e) {
  throw e;
}

// creating a model  in our database collection
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
