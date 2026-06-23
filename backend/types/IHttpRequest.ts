import { Request } from 'express';

export interface IHttpRequest extends Request {
	userId?: string;
}
