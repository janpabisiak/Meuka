import { Request, Response } from 'express';
import Product from '../models/productSchema';

const getProduct = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const product = await Product.findById(id).select('-__v');

		if (product) {
			res.status(200).json({
				status: 'success',
				data: product,
			});
		} else {
			res.status(404).json({
				status: 'failed',
				message: 'There is no product with this id.',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'error',
			error: err,
		});
	}
};

const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find().select('-__v');

		if (products.length) {
			res.status(200).json({
				status: 'success',
				data: products,
			});
		} else {
			res.status(404).json({
				status: 'failed',
				message: 'There is no data to send.',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'error',
			error: err,
		});
	}
};

const addProduct = async (req: Request, res: Response) => {
	try {
		const newProduct = req.body;

		const createdProduct = await Product.create(newProduct);

		res.status(201).json({
			status: 'success',
			data: createdProduct,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'error',
			error: err,
		});
	}
};

export { getProduct, getProducts, addProduct };
