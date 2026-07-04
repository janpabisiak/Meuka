import { body } from 'express-validator';
import { paginationValidator } from './paginationValidator';
import { firstNameValidation, idValidation, lastNameValidation } from './userValidator';

export const create = [
	firstNameValidation,
	lastNameValidation,
	body('address').isString().notEmpty().trim().withMessage('Address is required'),
	body('city').isString().notEmpty().trim().withMessage('City is required'),
	body('country').isString().notEmpty().trim().withMessage('Country is required'),
	body('products').isArray({ min: 1 }).withMessage('Products must be an array with at least one item'),
	body('products.*.id').isMongoId().withMessage('Product ID must be a valid Mongo ID'),
	body('products.*.selectedColor').isString().notEmpty().trim().withMessage('Selected color is required'),
	body('products.*.selectedSize').isString().notEmpty().trim().withMessage('Selected size is required'),
];

export const get = idValidation;

export const getAll = paginationValidator;
