import express from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import * as userValidator from '../validators/userValidator';

const router = express.Router();

router.get('/', authMiddleware, userController.getUser);
router.post('/register', userValidator.register, validationMiddleware, userController.createUser);
router.post('/login', userValidator.login, validationMiddleware, userController.loginUser);
router.patch('/change-password', authMiddleware, userValidator.changePassword, validationMiddleware, userController.changePassword);
router.patch('/', authMiddleware, userValidator.update, validationMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userValidator.deleteAccount, validationMiddleware, userController.deleteUser);

export default router;
