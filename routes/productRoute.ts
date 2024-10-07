import express from 'express';
import * as productController from '../controllers/productController';
const router = express.Router();

router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);

router.post('/add', productController.addProduct);

export default router;
