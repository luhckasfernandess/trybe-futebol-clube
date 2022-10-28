import joi = require('joi');

const loginValidate = joi.object({
  email: joi.string().required().messages({
    'any.required': '400|"All fields must be filled',
  }),
});

export default loginValidate;
