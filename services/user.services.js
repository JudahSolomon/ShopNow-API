const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
class Userservice {
  // creating a fun to handle user registration
  static async registerUser(username, email, password) {
    try {
      const createUser = new UserModel({
        email,
        username,
        password,
      });
      return await createUser.save();
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
    }
  }
  // creating a fun to handle user Login
  static async loginUser(email, password) {
    try {
      return await this.loginUser({
        email,
        password,
      });
    } catch (error) {
      throw error;
    }
    //
  }

  // this fun will generate the token for the user

  static async generateToken(tokenData, secretKey, jwt_expire) {
    return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
  }

  // Function to generate a random temporary password
  static async generateTempPassword() {
    const tempPassword = Math.random().toString(36).slice(-8);
    return tempPassword;
  }

  // Service to handle forgot password
  static async forgotPassword(email) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const tempPassword = this.generateTempPassword();
      const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

      user.password = hashedTempPassword;
      await user.save();

      await sendPasswordResetEmail(email, tempPassword);
      return tempPassword;
    } catch (error) {
      throw error;
    }
  }

  // Service to handle password reset
  static async resetPassword(email, newPassword) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedNewPassword;
      await user.save();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Userservice;
