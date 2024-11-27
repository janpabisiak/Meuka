import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const handleValidationErrors = (req: Request, res: Response): boolean => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ status: 'failed', errors: errors.array() });
		return false;
	}
	return true;
};

export default handleValidationErrors;
