import Joi from 'joi';

export const userSchema = Joi.string().email().required().messages({
  'string.email': 'Please provide a valid format email',
  'any.required': 'User email is required'
});

export const createListSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'List title is required'
  }),
  tasks: Joi.array(),
  user: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid format email',
    'any.required': 'User email is required'
  }),
});

export const updateListSchema = createListSchema.keys({
  id: Joi.string().regex(/^[0-9a-f-F]{24}$/).required().messages({
    'string.pattern.base': 'Please provide a valid format id',
    'any.required': 'Id is required'
  }),
});

export const idSchema = Joi.string().regex(/^[0-9a-f-F]{24}$/).required().messages({
  'string.pattern.base': 'Please provide a valid format id',
  'any.required': 'Please provide an id'
})