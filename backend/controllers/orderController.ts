import { Response } from 'express';
import { IHttpRequest } from '../types/IHttpRequest';
import { catchError } from '../utils/catchError';
import sendResponse from '../utils/sendResponse';
import * as orderService from '../services/orderService';

const createOrder = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { firstName, lastName, address, city, country, products, total } = req.body;
	const userId = req.userId!;

	req.log.info({ firstName, lastName, address, city, country, products, total, userId }, 'Order creation attempt.');
	return sendResponse(
		res,
		201,
		'success',
		'Order successfully created',
		await orderService.createOrder(firstName, lastName, address, city, country, products, total, userId),
	);
});

const getOrders = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const userId = req.userId!;

	req.log.info({ userId }, 'Orders fetch attempt.');
	return sendResponse(res, 200, 'success', 'Orders successfully fetched', await orderService.getOrders(userId));
});

const getOrder = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { id: orderId } = req.params;
	const userId = req.userId!;

	req.log.info({ orderId, userId }, 'Order fetch attempt.');
	return sendResponse(res, 200, 'success', 'Order successfully fetched.', await orderService.getOrderById(orderId, userId));
});

export { createOrder, getOrder, getOrders };
