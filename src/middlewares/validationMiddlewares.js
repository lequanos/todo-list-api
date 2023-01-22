import { userSchema, idSchema } from '../validation/schema.js';

export const checkUserSchema = async (req, _, next) => {
  await userSchema.validateAsync(req.headers['x-user']);
  next();
};

export const checkSchema = (schema) => async (req, _, next) => {
  await schema.validateAsync(req.body);
  await userSchema.validateAsync(req.headers['x-user']);
  next();
};

export const checkIdSchema = async (req, _, next) => {
  await idSchema.validateAsync(req.params.id);
  await userSchema.validateAsync(req.headers['x-user']);
  next();
};

export const checkMultipleIdSchema = async (req, _, next) => {
  await idSchema.validateAsync(req.params.taskId);
  await idSchema.validateAsync(req.params.listId);
  await userSchema.validateAsync(req.headers['x-user']);
  next();
};