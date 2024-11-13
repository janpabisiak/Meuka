import express, { Router } from 'express';
import * as userController from '../controllers/userController';
import * as userValidator from '../validators/userValidator';

const router: Router = express.Router();

router.get('/', userController.getUser);

router.post('/register', userValidator.register, userController.createUser);
router.post('/login', userValidator.login, userController.loginUser);
router.patch('/change-password', userValidator.changePassword, userController.changePassword);
router.delete('/:id', userController.deleteUser);

export default router;
