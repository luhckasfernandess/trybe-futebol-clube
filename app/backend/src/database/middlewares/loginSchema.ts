import joi = require('joi');

const loginValidate = joi.object({
  email: joi.string().email().required().messages({
    'any.required': '400|All fields must be filled',
    'string.email': '401|Incorrect email or password',
  }),
  password: joi.string().required().messages({
    'any.required': '400|All fields must be filled',
  }),
});

export default loginValidate;
