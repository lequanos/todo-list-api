import { userSchema } from '../validation/schema.js';

export const checkUserSchema = async (req, _, next) => {
  await userSchema.validateAsync(req.query.user);
  next();
};

export const checkSchema = (schema) => async (req, _, next) => {
  await schema.validateAsync(req.body);
  next();
};