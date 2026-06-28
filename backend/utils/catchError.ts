import { NextFunction, Request, Response } from 'express';
import { IHttpRequest } from '../types/IHttpRequest';

export const catchError = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): ((req: IHttpRequest, res: Response, next: NextFunction) => void) => {
	return (req: IHttpRequest, res: Response, next: NextFunction): void => {
		fn(req, res, next).catch((err: unknown) => {
			next(err);
		});
	};
};
