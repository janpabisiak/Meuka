import { body, param } from 'express-validator';

export const idValidation = [param('id').isMongoId().withMessage('Invalid ID format')];
export const firstNameValidation = body('firstName').isString().notEmpty().trim().withMessage('First name is required');
export const lastNameValidation = body('lastName').isString().notEmpty().trim().withMessage('Last name is required');
export const emailValidation = body('email').isEmail().trim().withMessage('Invalid email address');

export const register = [
	body('username').isString().isLength({ min: 3 }).trim().withMessage('Username must be at least 3 characters long'),
	emailValidation,
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
	firstNameValidation,
	lastNameValidation,
];

export const login = [emailValidation, body('password').notEmpty().withMessage('Password is required')];

export const changePassword = [
	body('currentPassword').notEmpty().withMessage('Current password is required'),
	body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
];

export const update = [
	body('firstName').optional().isString().trim().withMessage('First name must be a string'),
	body('lastName').optional().isString().trim().withMessage('Last name must be a string'),
	body('email').optional().isEmail().trim().withMessage('Invalid email address'),
];

export const deleteAccount = idValidation;
