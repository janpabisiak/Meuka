import { Response } from 'express';
import * as orderService from '../services/orderService';
import { IHttpRequest } from '../types/IHttpRequest';
import { CreateBody } from '../types/IOrder';
import { catchError } from '../utils/catchError';
import sendResponse from '../utils/sendResponse';

export const createOrder = catchError(async (req: IHttpRequest, res: Response) => {
	const body = req.body as CreateBody;
	const { firstName, lastName, address, city, country, products, total } = body;
	const userId = req.userId;

	req.log.info({ firstName, lastName, address, city, country, products, total, userId }, 'Order creation attempt.');
	sendResponse(
		res,
		201,
		'success',
		'Order successfully created',
		await orderService.createOrder(firstName, lastName, address, city, country, products, total, userId),
	);
});

export const getOrders = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const userId = req.userId;

	req.log.info({ userId }, 'Orders fetch attempt.');
	sendResponse(res, 200, 'success', 'Orders successfully fetched', await orderService.getOrders(userId));
});

export const getOrder = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { id: orderId } = req.params;
	const userId = req.userId;

	req.log.info({ orderId, userId }, 'Order fetch attempt.');
	sendResponse(res, 200, 'success', 'Order successfully fetched.', await orderService.getOrderById(orderId, userId));
});
