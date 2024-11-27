import express from 'express';
import * as productController from '../controllers/productController';
import * as productValidator from '../validators/productValidator';
const router = express.Router();

router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);
router.post('/add', productValidator.create, productController.addProduct);

export default router;
