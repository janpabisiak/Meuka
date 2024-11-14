import { body } from 'express-validator';

const register = [
	body('username')
		.isLength({ min: 8, max: 16 })
		.withMessage('Username must be between 8 and 16 characters long.')
		.isAlphanumeric()
		.withMessage('Username can only contain letters and numbers.')
		.trim()
		.escape(),

	body('email')
		.notEmpty()
		.withMessage('E-mail address is required.')
		.isEmail()
		.withMessage('Please provide a valid e-mail address.')
		.trim(),

	body('password').isLength({ min: 8, max: 255 }).withMessage('Password must be at least 8 characters long.').trim(),

	body('firstName')
		.notEmpty()
		.withMessage('First name is required.')
		.isAlphanumeric()
		.withMessage('First name must be alphanumeric.')
		.trim()
		.escape(),

	body('lastName')
		.notEmpty()
		.withMessage('Last name is required.')
		.isAlphanumeric()
		.withMessage('Last name must be alphanumeric.')
		.trim()
		.escape(),
];

const login = [
	body('email')
		.notEmpty()
		.withMessage('E-mail address is required.')
		.isEmail()
		.withMessage('Please provide a valid e-mail address.')
		.trim(),
	body('password').notEmpty().withMessage('Password is required.').trim(),
];

const changePassword = [
	body('currentPassword').notEmpty().withMessage('Password is required.').trim(),
	body('newPassword').notEmpty().withMessage('Password is required.').trim(),
];

const update = [
	body('email')
		.notEmpty()
		.withMessage('E-mail address is required.')
		.isEmail()
		.withMessage('Please provide a valid e-mail address.')
		.trim(),

	body('firstName')
		.notEmpty()
		.withMessage('First name is required.')
		.isAlphanumeric()
		.withMessage('First name must be alphanumeric.')
		.trim()
		.escape(),

	body('lastName')
		.notEmpty()
		.withMessage('Last name is required.')
		.isAlphanumeric()
		.withMessage('Last name must be alphanumeric.')
		.trim()
		.escape(),
];

export { register, login, changePassword, update };
