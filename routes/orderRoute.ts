import express from 'express';
import * as orderController from '../controllers/orderController';
import * as orderValidator from '../validators/orderValidator';
const router = express.Router();

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrder);
router.post('/', orderValidator.create, orderController.createOrder);

export default router;
