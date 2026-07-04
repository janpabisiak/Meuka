import { query } from 'express-validator';

export const paginationValidator = [
	query('limit').optional().isNumeric().withMessage('Limit must be a number'),
	query('offset').optional().isNumeric().withMessage('Offset must be a number'),
];
