import { NextFunction, Response } from 'express';
import { IHttpRequest } from '../types/IHttpRequest';

export const catchError = (fn: Function): ((req: IHttpRequest, res: Response, next: NextFunction) => void) => {
	return (req: IHttpRequest, res: Response, next: NextFunction): void => {
		fn(req, res, next).catch((err: any) => next(err));
	};
};
