import Order from '../models/orderSchema';
import User from '../models/userSchema';
import Product from '../models/productSchema';
import { IOrder, IOrderProduct } from '../types/IOrder';
import { IUser } from '../types/IUser';
import { capitalizeString } from '../utils/capitalizeString';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';

export const getOrders = async (userId?: string): Promise<IOrder[]> => {
	const user: IUser | null = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	return await Order.find({ userID: user.id });
};

export const getOrderById = async (id: string, userId?: string): Promise<IOrder> => {
	const user: IUser | null = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	const order: IOrder | null = await Order.findOne({ _id: id, userID: user.id });

	if (!order) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'Order not found or does not belong to the user.');
	}

	return order;
};

export const createOrder = async (
	firstName: string,
	lastName: string,
	address: string,
	city: string,
	country: string,
	products: IOrderProduct[],
	userId?: string,
): Promise<IOrder> => {
	const user: IUser | null = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	const productIds = products.map((product) => product.id);
	const productEntities = await Product.find({ _id: { $in: productIds } });

	const productMap = new Map(productEntities.map((product) => [product.id, product]));

	let total = 0;

	const finalProducts = products.map((productInput) => {
		const dbProduct = productMap.get(productInput.id);

		if (!dbProduct) {
			throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, `Product with ID ${productInput.id} not found`);
		}

		total += dbProduct.price;

		return {
			...dbProduct.toObject(),
			selectedColor: productInput.selectedColor,
			selectedSize: productInput.selectedSize,
		};
	});

	const newOrder = {
		userID: user.id,
		firstName: capitalizeString(firstName),
		lastName: capitalizeString(lastName),
		address: capitalizeString(address),
		city: capitalizeString(city),
		country: capitalizeString(country),
		products: finalProducts,
		total,
		date: new Date().toISOString(),
	} as unknown as IOrder;

	return await Order.create(newOrder);
};
