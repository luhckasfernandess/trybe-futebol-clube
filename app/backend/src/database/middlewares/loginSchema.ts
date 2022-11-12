import * as Joi from 'joi';
import { ILogin } from '../interfaces';

const messageEmpty = 'All fields must be filled';

const LoginSchema = Joi.object<ILogin>({
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    'string.empty': messageEmpty,
    'string.email': 'Incorrect email or password',
    'any.required': messageEmpty,
  }),
  password: Joi.string().min(6).required()
    .messages({
      'string.empty': messageEmpty,
      'string.min': 'Password must contain at least 6 characters',
      'any.required': messageEmpty,
    }),
});

export default LoginSchema;
