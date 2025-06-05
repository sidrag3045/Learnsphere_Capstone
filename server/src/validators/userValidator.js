const Joi = require('joi');

const registerUserSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'instructor').required()
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

module.exports = {
  registerUserSchema,
  loginUserSchema
};
