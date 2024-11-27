import { Response } from 'express';

const sendResponse = (res: Response, statusCode: number, status: string, message: string, data: any = null, token: any = null) => {
	const responseBody: any = { status, message };
	if (data) responseBody.data = data;
	if (token) responseBody.token = token;
	res.status(statusCode).json(responseBody);
};

export default sendResponse;
