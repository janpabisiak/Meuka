import { Response } from 'express';
import { IHttpResponse } from '../types/IHttpResponse';

interface ISendResponseInput {
	res: Response;
	statusCode: number;
	status: string;
	message: string;
	data?: unknown;
	total?: number;
	token?: string;
}

const sendResponse = ({ res, statusCode, status, message, data, total, token }: ISendResponseInput) => {
	const responseBody: IHttpResponse = { status, message };
	if (data) {
		responseBody.data = data;
	}

	if (total) {
		responseBody.total = total;
	}

	if (token) {
		responseBody.token = token;
	}

	res.status(statusCode).json(responseBody);
};

export default sendResponse;
