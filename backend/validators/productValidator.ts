import { body } from 'express-validator';
import { idValidation } from './userValidator';

export const create = [
	body('title').isString().notEmpty().trim().withMessage('Product title is required'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
	body('category').isString().notEmpty().trim().withMessage('Category is required'),
	body('description').optional().isString().trim().withMessage('Description must be a string'),
];

export const get = idValidation;
