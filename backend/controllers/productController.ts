import { Request, Response } from 'express';
import { catchError } from '../utils/catchError';
import sendResponse from '../utils/sendResponse';
import * as productService from '../services/productService';
import { CreateBody } from '../types/IProduct';
import { parsePagination } from '../utils/parsePagination';

export const getProduct = catchError(async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	req.log.info({ id }, 'Product fetch attempt.');
	sendResponse({
		res,
		statusCode: 200,
		status: 'success',
		message: 'Product successfully fetched',
		data: await productService.getProductById(id),
	});
});

export const getProducts = catchError(async (req: Request, res: Response): Promise<void> => {
	const { search, category } = req.query;
	const pagination = parsePagination(req);

	req.log.info({ category, pagination }, 'Products fetch attempt.');
	const { data, total } = await productService.getProducts(pagination, search as string, category as string);
	sendResponse({
		res,
		statusCode: 200,
		status: 'success',
		message: 'Products successfully fetched',
		data,
		total,
	});
});

export const addProduct = catchError(async (req: Request, res: Response): Promise<void> => {
	const body = req.body as CreateBody;
	const { title, category, price, description, images, colors, sizes } = body;

	req.log.info({ title, category, price, description }, 'Product creation attempt.');
	sendResponse({
		res,
		statusCode: 201,
		status: 'success',
		message: 'Product successfully added',
		data: await productService.createProduct(title, category, price, description, images, colors, sizes),
	});
});
