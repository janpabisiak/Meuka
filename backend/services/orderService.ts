import Order from '../models/orderSchema';
import User from '../models/userSchema';
import Product from '../models/productSchema';
import { IOrder, IOrderDto, IOrderProduct } from '../types/IOrder';
import { IUser } from '../types/IUser';
import { capitalizeString } from '../utils/capitalizeString';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';
import { IPagination, IPaginationDto } from '../types/IPagination';

export const getOrders = async (pagination: IPagination, userId?: string): Promise<IPaginationDto<IOrderDto>> => {
	const user: IUser | null = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	const filters = {
		userID: user.id,
	};

	const [orderEntities, total] = await Promise.all([
		Order.find(filters).skip(pagination.offset).limit(pagination.limit),
		Order.countDocuments(filters),
	]);

	return { data: orderEntities.map((order) => toDto(order)), total };
};

export const getOrderById = async (id: string, userId?: string): Promise<IOrderDto> => {
	const user: IUser | null = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	const order: IOrder | null = await Order.findOne({ _id: id, userID: user.id });

	if (!order) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'Order not found or does not belong to the user.');
	}

	return toDto(order);
};

export const createOrder = async (
	firstName: string,
	lastName: string,
	address: string,
	city: string,
	country: string,
	products: IOrderProduct[],
	userId?: string,
): Promise<IOrderDto> => {
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

		if (!dbProduct.colors.includes(productInput.selectedColor)) {
			throw new HttpError(
				HttpResponseStatuses.BadRequest,
				HttpResponseTypes.Failed,
				`Color ${productInput.selectedColor} is not available for this product`,
			);
		}

		if (!dbProduct.sizes.includes(productInput.selectedSize)) {
			throw new HttpError(
				HttpResponseStatuses.BadRequest,
				HttpResponseTypes.Failed,
				`Size ${productInput.selectedSize} is not available for this product`,
			);
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
	} as unknown as IOrder;

	const order = await Order.create(newOrder);
	return toDto(order);
};

const toDto = (order: IOrder): IOrderDto => {
	return order;
};
