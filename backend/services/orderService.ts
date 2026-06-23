import User from '../models/userSchema';
import Order from '../models/orderSchema';
import IOrder from '../types/IOrder';
import capitalizeString from '../utils/capitalizeString';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';

const getOrders = async (userId: string): Promise<IOrder[]> => {
	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	return await Order.find({ userID: user._id });
};

const getOrderById = async (id: string, userId: string): Promise<IOrder> => {
	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	const order = await Order.findOne({ _id: id, userID: user._id });

	if (!order) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'Order not found or does not belong to the user.');
	}

	return order;
};

const createOrder = async (
	firstName: string,
	lastName: string,
	address: string,
	city: string,
	country: string,
	products: number[],
	total: number,
	userId: string,
): Promise<IOrder> => {
	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

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

	return await Order.create(newOrder);
};

export { getOrders, getOrderById, createOrder };
