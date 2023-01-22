import express from 'express';
import Joi from 'joi';

import listController from '../controllers/listController.js';
import errorHandler from '../helpers/errorHandler.js';
import {
  checkUserSchema,
  checkSchema,
  checkIdSchema,
  checkMultipleIdSchema,
} from '../middlewares/validationMiddlewares.js';
import {
  createListSchema,
  updateListSchema,
  createTaskSchema,
  updateTaskSchema,
} from '../validation/schema.js';

const router = express.Router();

router.get('/lists', errorHandler(checkUserSchema), errorHandler(listController.getByUser));
router.post('/list', errorHandler(checkSchema(createListSchema)), errorHandler(listController.createList));
router.put('/list', errorHandler(checkSchema(updateListSchema)), errorHandler(listController.updateList));
router.delete('/list/:id', errorHandler(checkIdSchema), errorHandler(listController.deleteList));
router.patch('/add/task', errorHandler(checkSchema(createTaskSchema)), errorHandler(listController.addTask));
router.patch('/update/task', errorHandler(checkSchema(updateTaskSchema)), errorHandler(listController.updateTask));
router.delete('/delete/task/:taskId/:listId', errorHandler(checkMultipleIdSchema), errorHandler(listController.deleteTask));

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