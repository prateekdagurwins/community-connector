// validationSchemas.js
import Joi from 'joi';

export const validateSchema = (payload) => {
  switch (payload) {
    case 'addUser':
      return Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        age: Joi.number().integer().min(18).required(),
        role: Joi.string().valid('user', 'admin').required(),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
          .message(
            'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)'
          )
          .required(),
      }).options({ abortEarly: false });

    case 'loginUser':
      return Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).options({ abortEarly: false });

    case 'updateUser':
      return Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        age: Joi.number().integer().min(18),
        role: Joi.string().valid('user', 'admin'),
        password: Joi.string()
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
          .message(
            'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)'
          ),
      }).options({ abortEarly: false });

    default:
      throw new Error('Invalid payload type');
  }
};
