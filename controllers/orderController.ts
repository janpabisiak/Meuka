import 'dotenv/config';
import { Request, Response } from 'express';
import User from '../models/userSchema';
import Order from '../models/orderSchema';
import sendResponse from '../utils/sendResponse';
import handleValidationErrors from '../utils/handleValidationErrors';
import verifyToken from '../utils/verifyToken';
import capitalizeString from '../utils/capitalizeString';

const createOrder = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const payload = verifyToken(req, res);
		if (!payload) return;

		const user = await User.findOne({ username: payload.username });

		if (!user) return sendResponse(res, 404, 'failed', 'There is no user with provided id');

		const { firstName, lastName, address, city, country, products, total } = req.body;

		const newOrder = {
			userID: user._id,
			firstName: capitalizeString(firstName),
			lastName: capitalizeString(lastName),
			address: capitalizeString(address),
			city: capitalizeString(city),
			country: capitalizeString(country),
			products,
			total,
			date: new Date().toISOString(),
		};

		await Order.create(newOrder);
		return sendResponse(res, 201, 'success', 'Order successfully created');
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

const getOrders = async (req: Request, res: Response) => {
	try {
		const payload = verifyToken(req, res);
		if (!payload) return;

		const user = await User.findOne({ username: payload.username });

		if (!user) return sendResponse(res, 404, 'failed', 'There is no user with provided. id');

		const orders = await Order.find({ userID: user.id });
		return sendResponse(res, 200, 'success', 'Orders successfully fetched', orders);
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

const getOrder = async (req: Request, res: Response) => {
	try {
		const payload = verifyToken(req, res);
		if (!payload) return;

		const user = await User.findOne({ username: payload.username });

		if (!user) return sendResponse(res, 404, 'failed', 'User not found');

		const { id: orderId } = req.params;
		const order = await Order.findOne({ _id: orderId, userID: user.id });

		if (!order) return sendResponse(res, 404, 'failed', 'Order not found or does not belong to the user.');

		return sendResponse(res, 200, 'success', 'Order successfully fetched.', order);
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

export { createOrder, getOrders, getOrder };
