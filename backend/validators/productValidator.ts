import { body, query } from 'express-validator';
import { idValidation } from './userValidator';
import { paginationValidator } from './paginationValidator';
import { Categories } from '../types/IProduct';

const availableCategories = Object.values(Categories);

export const create = [
	body('title').isString().notEmpty().trim().withMessage('Product title is required'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
	body('category')
		.isString()
		.notEmpty()
		.trim()
		.isIn(availableCategories)
		.withMessage(`Category is required and must be in ${availableCategories.join(', ')}`),
	body('description').optional().isString().trim().withMessage('Description must be a string'),
	body('images').isArray({ min: 1 }).withMessage('At least one image is required'),
	body('images.*').isString().notEmpty().trim().withMessage('Image URL must be a string'),
	body('colors').isArray({ min: 1 }).withMessage('At least one color is required'),
	body('colors.*').isString().notEmpty().trim().withMessage('Color must be a string'),
	body('sizes').isArray({ min: 1 }).withMessage('At least one size is required'),
	body('sizes.*').isString().notEmpty().trim().withMessage('Size must be a string'),
];

export const get = idValidation;

export const getAll = [
	...paginationValidator,
	query('search').optional().isString().withMessage('Product name must be a string'),
	query('category')
		.optional()
		.isIn(availableCategories)
		.withMessage(`Category must be ${availableCategories.join(', ')}`),
];
