import { RootFilterQuery } from 'mongoose';
import Product from '../models/productSchema';
import { IPagination, IPaginationDto } from '../types/IPagination';
import { IProduct, IProductDto } from '../types/IProduct';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';
import { capitalizeString } from '../utils/capitalizeString';

export const getProducts = async (pagination: IPagination, search?: string, category?: string): Promise<IPaginationDto<IProductDto>> => {
	const filters: RootFilterQuery<IProduct> = {};

	if (search) {
		filters.title = new RegExp(search, 'i');
	}

	if (category) {
		filters.category = capitalizeString(category);
	}

	const [products, total] = await Promise.all([
		Product.find(filters).skip(pagination.offset).limit(pagination.limit),
		Product.countDocuments(filters),
	]);

	return { data: products.map((product) => toDto(product)), total };
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
	images?: string[],
	colors?: string[],
	sizes?: string[],
): Promise<IProductDto> => {
	const product = await Product.create({ title, category, price, description, images, colors, sizes });
	return toDto(product);
};

const toDto = (product: IProduct): IProductDto => {
	return product;
};
