import { Request, Response } from 'express';
import Product from '../models/productSchema';
import sendResponse from '../utils/sendResponse';
import handleValidationErrors from '../utils/handleValidationErrors';

const getProduct = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const { id } = req.params;

		const product = await Product.findById(id).select('-__v');

		if (!product) return sendResponse(res, 404, 'failed', 'There is no product with this id');

		return sendResponse(res, 200, 'success', 'Product successfully fetched', product);
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

const getProducts = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const { category = null } = req.query;
		let products;

		if (category) products = await Product.find().where({ category }).select('-__v');
		else products = await Product.find().select('-__v');

		if (!products.length) return sendResponse(res, 404, 'failed', 'There is no data to send');

		return sendResponse(res, 200, 'success', 'Products successfully fetched', products);
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

const addProduct = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const newProduct = req.body;
		const createdProduct = await Product.create(newProduct);

		return sendResponse(res, 201, 'success', 'Product successfully added', createdProduct);
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

export { getProduct, getProducts, addProduct };
