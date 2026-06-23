import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
import { IHttpRequest } from '../types/IHttpRequest';
import TokenPayload from '../types/TokenPayload';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';

export const authMiddleware = (req: IHttpRequest, res: Response, next: NextFunction): void => {
	const authHeader = req.headers['authorization'];

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return next(new HttpError(HttpResponseStatuses.NotAuthorized, HttpResponseTypes.Failed));
	}

	const token = authHeader.split(' ')[1];
	const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as TokenPayload;

	req.userId = decodedToken.userId;
	next();
};
