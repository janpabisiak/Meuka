import { body } from 'express-validator';
import { firstNameValidation, lastNameValidation } from './userValidator';

export const create = [
	firstNameValidation,
	lastNameValidation,
	body('address').isString().notEmpty().trim().withMessage('Address is required'),
	body('city').isString().notEmpty().trim().withMessage('City is required'),
	body('country').isString().notEmpty().trim().withMessage('Country is required'),
	body('products').isArray({ min: 1 }).withMessage('Products must be an array with at least one item'),
	body('total').isFloat({ gt: 0 }).withMessage('Total must be a positive number'),
];
