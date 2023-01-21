import Joi from 'joi';

export const userSchema = Joi.string().email().required().messages({
  'string.email': 'user email provided is not valid',
  'any.required': 'user email is required'
});

export const createListSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'list title is required'
  }),
  tasks: Joi.array(),
  user: Joi.string().email().required().messages({
    'string.email': 'user email provided is not valid',
    'any.required': 'user email is required'
  }),
});

export const updateListSchema = createListSchema.keys({
  id: Joi.string().required().messages({
    'any.required': 'id is required'
  }),
});
