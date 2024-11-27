import { body, param } from 'express-validator';

const register = [
	body('username').isString().isLength({ min: 3 }).trim().withMessage('Username must be at least 3 characters long'),
	body('email').isEmail().trim().withMessage('Invalid email address'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
	body('firstName').isString().notEmpty().trim().withMessage('First name is required'),
	body('lastName').isString().notEmpty().trim().withMessage('Last name is required'),
];

const login = [
	body('email').isEmail().trim().withMessage('Invalid email address'),
	body('password').notEmpty().withMessage('Password is required'),
];

const changePassword = [
	body('currentPassword').notEmpty().withMessage('Current password is required'),
	body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
];

const update = [
	body('firstName').optional().isString().trim().withMessage('First name must be a string'),
	body('lastName').optional().isString().trim().withMessage('Last name must be a string'),
	body('email').optional().isEmail().trim().withMessage('Invalid email address'),
];

const deleteAccount = [param('id').isMongoId().withMessage('Invalid user ID format')];

export { register, login, changePassword, update, deleteAccount };
