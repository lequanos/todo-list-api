import { userSchema, listSchema } from '../validation/schema.js';

export const checkUserSchema = async (req, _, next) => {
  await userSchema.validateAsync(req.query.user);
  next();
};

export const checkListSchema = async (req, _, next) => {
  await listSchema.validateAsync(req.body);
  next();
};