import { Request, Response } from 'express';
import { catchError } from '../utils/catchError';
import sendResponse from '../utils/sendResponse';
import * as productService from '../services/productService';
import { CreateBody } from '../types/IProduct';

export const getProduct = catchError(async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	req.log.info({ id }, 'Product fetch attempt.');
	sendResponse(res, 200, 'success', 'Product successfully fetched', await productService.getProductById(id));
});

export const getProducts = catchError(async (req: Request, res: Response): Promise<void> => {
	const { category } = req.query;

	req.log.info({ category }, 'Products fetch attempt.');
	sendResponse(res, 200, 'success', 'Products successfully fetched', await productService.getProducts(category as string));
});

export const addProduct = catchError(async (req: Request, res: Response): Promise<void> => {
	const body = req.body as CreateBody;
	const { title, category, price, description } = body;

	req.log.info({ title, category, price, description }, 'Product creation attempt.');
	sendResponse(
		res,
		201,
		'success',
		'Product successfully added',
		await productService.createProduct(title, category, price, description),
	);
});
