const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .pattern(new RegExp("^[^s@]+@[^s@]+.[^s@]+$")),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  username: Joi.string().alphanum().min(3).max(30).required(),
  role: Joi.string().valid("user").required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const logout = Joi.object({
  refreshToken: Joi.string().required(),
});

const accessTokenSchema = Joi.object({
  accessToken: Joi.string().required(),
});

const refreshTokens = Joi.object({
  refreshToken: Joi.string().required(),
});

const verifyEmail = Joi.object({
  token: Joi.string().required(),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

const resetPassword = Joi.object({
  token: Joi.string().required(),
});

module.exports = {
  authSchema,
  loginSchema,
  accessTokenSchema,
  logout,
  forgotPassword,
  refreshTokens,
  verifyEmail,
  resetPassword,
};
