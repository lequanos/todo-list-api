import express from 'express';
import listController from '../controllers/listController.js';
import errorHandler from '../helpers/errorHandler.js';
import {
  checkUserSchema,
  checkListSchema
} from '../middlewares/validationMiddlewares.js';
import Joi from 'joi';

const router = express.Router();

router.get('/lists', errorHandler(checkUserSchema), errorHandler(listController.getByUser));
router.post('/list', errorHandler(checkListSchema), errorHandler(listController.createList));

router.use((err, _, res, __) => {
  let {
    message,
    statusCode,
  } = err;

  if (!statusCode || Number.isNaN(Number(statusCode))) {
    statusCode = 500;
  }

  if (Joi.isError(err)) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
});

export default router;