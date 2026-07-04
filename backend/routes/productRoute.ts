import express from 'express';
import * as productController from '../controllers/productController';
import * as productValidator from '../validators/productValidator';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', productValidator.getAll, validationMiddleware, productController.getProducts);
router.get('/:id', productValidator.get, validationMiddleware, productController.getProduct);
router.post('/add', authMiddleware, productValidator.create, validationMiddleware, productController.addProduct);

export default router;
