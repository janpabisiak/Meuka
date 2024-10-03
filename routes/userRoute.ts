import express, { Router } from 'express';
import * as userController from '../controllers/userController';

const router: Router = express.Router();

router.get('/:id', userController.getUser);
router.get('/', userController.getUsers);

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

// router.patch('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

export default router;
