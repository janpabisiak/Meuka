import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';
import { ITokenPayload } from '../types/ITokenPayload';
import { IHttpRequest } from '../types/IHttpRequest';

export const authMiddleware = (req: IHttpRequest, res: Response, next: NextFunction): void => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith('Bearer')) {
		next(new HttpError(HttpResponseStatuses.NotAuthorized, HttpResponseTypes.Failed));
		return;
	}

	const token = authHeader.split(' ')[1];
	const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as ITokenPayload;

	req.userId = decodedToken.userId;
	next();
};
