import Product from '../models/productSchema';
import { IProduct, IProductDto } from '../types/IProduct';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';

export const getProducts = async (category?: string): Promise<IProductDto[]> => {
	const query = Product.find().select('-__v');
	if (category) {
		query.where({ category });
	}

	const products = await query;

	return products.map((product) => toDto(product));
};

export const getProductById = async (id: string): Promise<IProductDto> => {
	const product: IProduct | null = await Product.findById(id).select('-__v');

	if (!product) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no product with provided id');
	}

	return toDto(product);
};

export const createProduct = async (
	title: string,
	category: string,
	price: number,
	description?: string,
): Promise<IProductDto> => {
	const product = await Product.create({ title, category, price, description });
	return toDto(product);
};

const toDto = (product: IProduct): IProductDto => {
	return product;
};
