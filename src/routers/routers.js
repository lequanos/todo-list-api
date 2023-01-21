import express from 'express';
import listController from '../controllers/listController.js';
import controllerHandler from '../helpers/controllerHandler.js';

const router = express.Router();

router.get('/lists', controllerHandler(listController.getByUser));

router.use((err, _, res, __) => {
  let {
    message,
    statusCode,
  } = err;

  if (!statusCode || Number.isNaN(Number(statusCode))) {
    statusCode = 500;
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
});

export default router;