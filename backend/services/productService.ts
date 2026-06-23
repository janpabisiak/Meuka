import Product from '../models/productSchema';
import IProduct from '../types/IProduct';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';

const getProducts = async (category?: string): Promise<IProduct[]> => {
	if (category) {
		return await Product.find().where({ category }).select('-__v');
	}

	return await Product.find().select('-__v');
};

const getProductById = async (id: string): Promise<IProduct> => {
	const product = await Product.findById(id).select('-__v');

	if (!product) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no product with provided id');
	}

	return product;
};

const createProduct = async (product: Partial<IProduct>): Promise<IProduct> => {
	return await Product.create(product);
};

export { getProducts, getProductById, createProduct };
