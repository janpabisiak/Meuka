import express from 'express';
import * as orderController from '../controllers/orderController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import * as orderValidator from '../validators/orderValidator';

const router = express.Router();

router.get('/', orderController.getOrders);
router.get('/:id', orderValidator.get, validationMiddleware, orderController.getOrder);
router.post('/', orderValidator.create, validationMiddleware, orderController.createOrder);

export default router;
