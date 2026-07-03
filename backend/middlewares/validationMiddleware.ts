import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';
import { IHttpRequest } from '../types/IHttpRequest';

export function validationMiddleware(req: IHttpRequest, res: Response, next: NextFunction) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const firstError = errors.array()[0];
		next(new HttpError(HttpResponseStatuses.BadRequest, HttpResponseTypes.Failed, firstError.msg as string));
	}

	next();
}
