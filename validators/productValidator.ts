import { body } from 'express-validator';

const create = [
	body('name').isString().notEmpty().trim().withMessage('Product name is required'),
	body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
	body('category').isString().notEmpty().trim().withMessage('Category is required'),
	body('description').optional().isString().trim().withMessage('Description must be a string'),
];

export { create };
