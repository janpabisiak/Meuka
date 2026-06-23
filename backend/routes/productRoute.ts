import express from 'express';
import * as productController from '../controllers/productController';
import * as productValidator from '../validators/productValidator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = express.Router();

router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);
router.post('/add', productValidator.create, validationMiddleware, productController.addProduct);

export default router;
