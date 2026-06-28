import { Response } from 'express';
import { IHttpResponse } from '../types/IHttpResponse';

const sendResponse = (res: Response, statusCode: number, status: string, message: string, data?: unknown, token?: string) => {
	const responseBody: IHttpResponse = { status, message };
	if (data) {
		responseBody.data = data;
	}

	if (token) {
		responseBody.token = token;
	}

	res.status(statusCode).json(responseBody);
};

export default sendResponse;
