import { Response } from 'express';
import * as orderService from '../services/orderService';
import { IHttpRequest } from '../types/IHttpRequest';
import { CreateBody } from '../types/IOrder';
import { catchError } from '../utils/catchError';
import sendResponse from '../utils/sendResponse';
import { parsePagination } from '../utils/parsePagination';

export const createOrder = catchError(async (req: IHttpRequest, res: Response) => {
	const body = req.body as CreateBody;
	const { firstName, lastName, address, city, country, products } = body;
	const userId = req.userId;

	req.log.info({ firstName, lastName, address, city, country, products, userId }, 'Order creation attempt.');
	sendResponse({
		res,
		statusCode: 201,
		status: 'success',
		message: 'Order successfully created',
		data: await orderService.createOrder(firstName, lastName, address, city, country, products, userId),
	});
});

export const getOrders = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const pagination = parsePagination(req);
	const userId = req.userId;

	req.log.info({ userId, pagination }, 'Orders fetch attempt.');
	const { data, total } = await orderService.getOrders(pagination, userId);
	sendResponse({
		res,
		statusCode: 200,
		status: 'success',
		message: 'Orders successfully fetched',
		data,
		total,
	});
});

export const getOrder = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { id: orderId } = req.params;
	const userId = req.userId;

	req.log.info({ orderId, userId }, 'Order fetch attempt.');
	sendResponse({
		res,
		statusCode: 200,
		status: 'success',
		message: 'Order successfully fetched.',
		data: await orderService.getOrderById(orderId, userId),
	});
});
