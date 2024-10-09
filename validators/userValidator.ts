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

	body('password')
		.isStrongPassword({
			minLength: 10,
			minUppercase: 2,
			minNumbers: 2,
			minSymbols: 0,
		})
		.withMessage('Password must be at least 10 characters long, contain at least 2 uppercase letters, and 2 numbers.')
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

const login = [
	body('email')
		.notEmpty()
		.withMessage('E-mail address is required.')
		.isEmail()
		.withMessage('Please provide a valid e-mail address.')
		.trim(),
	body('password').notEmpty().withMessage('Password is required.').trim(),
];

export { register, login };
