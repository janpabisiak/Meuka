import { Request, Response } from 'express';
import { catchError } from '../utils/catchError';
import sendResponse from '../utils/sendResponse';
import * as productService from '../services/productService';

const getProduct = catchError(async (req: Request, res: Response): Promise<void> => {
	const { id } = req.params;

	return sendResponse(res, 200, 'success', 'Product successfully fetched', await productService.getProductById(id));
});

const getProducts = catchError(async (req: Request, res: Response): Promise<void> => {
	const { category } = req.query;

	return sendResponse(res, 200, 'success', 'Products successfully fetched', await productService.getProducts(category as string));
});

const addProduct = catchError(async (req: Request, res: Response): Promise<void> => {
	const newProduct = req.body;

	return sendResponse(res, 201, 'success', 'Product successfully added', await productService.createProduct(newProduct));
});

export { addProduct, getProduct, getProducts };
