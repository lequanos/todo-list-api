import Joi from 'joi';

export const userSchema = Joi.string().email().required().messages({
  'string.email': 'Please provide a valid format email',
  'any.required': 'User email is required'
});

export const createListSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'List title is required'
  }),
  tasks: Joi.array().items(
    Joi.object({
        id: Joi.string().regex(/^[0-9a-f-F]{24}$/).required().messages({
          'string.pattern.base': 'Please provide a valid format id',
          'any.required': 'Id is required'
        }),
        status: Joi.string().valid('active', 'inactive').required().messages({
          'string.valid': 'Please provide a valid value for status',
          'any.required': 'Status is required',
        }),
        title: Joi.string().required().messages({
          'any.required': 'Task title is required'
        }),
        endDate: Joi.date().min(Date.now()).required().messages({
          'date.min': 'End date must be greater than current time',
          'any.required': 'Task end date is required'
        }),
  })
  ),
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

export const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Task title is required'
  }),
  endDate: Joi.date().min(Date.now()).required().messages({
    'date.min': 'End date must be greater than current time',
    'any.required': 'Task end date is required'
  }),
  listId: Joi.string().regex(/^[0-9a-f-F]{24}$/).required().messages({
    'string.pattern.base': 'Please provide a valid format id',
    'any.required': 'ListId is required'
  }),
});

export const updateTaskSchema = createTaskSchema.keys({
  id: Joi.string().regex(/^[0-9a-f-F]{24}$/).required().messages({
    'string.pattern.base': 'Please provide a valid format id',
    'any.required': 'Id is required'
  }),
  status: Joi.string().valid('active', 'inactive').required().messages({
    'string.valid': 'Please provide a valid value for status',
    'any.required': 'Status is required',
  }),
  endDate: Joi.date(),
});