import { NextFunction, Response } from 'express';
import { IHttpRequest } from '../types/IHttpRequest';
import { validationResult } from 'express-validator';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';

export function validationMiddleware(req: IHttpRequest, res: Response, next: NextFunction) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const firstError = errors.array()[0];
		throw new HttpError(HttpResponseStatuses.BadRequest, HttpResponseTypes.Failed, firstError.msg);
	}

	next();
}
