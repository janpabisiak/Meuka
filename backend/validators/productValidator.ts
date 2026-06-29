import { body } from 'express-validator';
import { idValidation } from './userValidator';

export const create = [
	body('title').isString().notEmpty().trim().withMessage('Product title is required'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
	body('category')
		.isString()
		.notEmpty()
		.trim()
		.isIn(['Men', 'Women', 'Kids'])
		.withMessage('Category is required and must be Men, Women, or Kids'),
	body('description').optional().isString().trim().withMessage('Description must be a string'),
	body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
	body('images.*').isString().notEmpty().trim().withMessage('Image URL must be a string'),
	body('colors').isArray({ min: 1 }).withMessage('At least one color is required'),
	body('colors.*').isString().notEmpty().trim().withMessage('Color must be a string'),
	body('sizes').isArray({ min: 1 }).withMessage('At least one size is required'),
	body('sizes.*').isString().notEmpty().trim().withMessage('Size must be a string'),
];

export const get = idValidation;
