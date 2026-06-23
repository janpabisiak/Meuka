import express from 'express';
import * as orderController from '../controllers/orderController';
import * as orderValidator from '../validators/orderValidator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = express.Router();

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrder);
router.post('/', orderValidator.create, validationMiddleware, orderController.createOrder);

export default router;
