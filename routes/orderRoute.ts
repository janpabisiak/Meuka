import express from 'express';
import * as OrderController from '../controllers/orderController';
const router = express.Router();

router.get('/', OrderController.displayOrders);
router.post('/', OrderController.createOrder);

export default router;
