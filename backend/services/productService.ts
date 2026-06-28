import Product from '../models/productSchema';
import { IProduct } from '../types/IProduct';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';

export const getProducts = async (category?: string): Promise<IProduct[]> => {
	if (category) {
		return await Product.find().where({ category }).select('-__v');
	}

	return await Product.find().select('-__v');
};

export const getProductById = async (id: string): Promise<IProduct> => {
	const product: IProduct | null = await Product.findById(id).select('-__v');

	if (!product) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no product with provided id');
	}

	return product;
};

export const createProduct = async (name: string, category: string, price: number, description?: string): Promise<IProduct> => {
	return await Product.create({ name, category, price, description });
};
