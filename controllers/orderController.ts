import { Request, Response } from 'express';
import 'dotenv/config';
import User from '../models/userSchema';
import Order from '../models/orderSchema';
import jwt from 'jsonwebtoken';
import TokenPayload from '../interfaces/TokenPayload';
import IUser from '../interfaces/IUser';

const createOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.headers['authorization']?.split(' ')[1];

		if (token) {
			const { username } = jwt.verify(token, process.env.JWT_SECRET_KEY!) as TokenPayload;
			const user = await User.findOne({ username });

			if (user) {
				const { firstName, lastName, address, city, country, products, total } = req.body;

				const user = (await User.findOne({ username })) as IUser;

				const newOrder = {
					userID: user._id,
					firstName,
					lastName,
					address,
					city,
					country,
					products,
					total,
				};

				await Order.create(newOrder);
				res.status(201).json({
					status: 'success',
					message: 'Order successfully created.',
				});
			} else {
				res.status(404).json({
					status: 'failed',
					message: 'There is no user with provided id.',
				});
			}
		} else {
			res.status(403).json({
				status: 'failed',
				message: 'Not authorized.',
			});
		}
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err,
		});
	}
};

const displayOrders = async (req: Request, res: Response): Promise<void> => {
	const token = req.headers['authorization']?.split(' ')[1];

	if (token) {
		const { username } = jwt.verify(token, process.env.JWT_SECRET_KEY!) as TokenPayload;
		const user = await User.findOne({ username });

		if (user) {
			const orders = await Order.find({ userID: user.id });
			res.status(200).json({
				status: 'success',
				data: orders,
			});
		} else {
			res.status(404).json({
				status: 'failed',
				message: 'There is no user with provided id.',
			});
		}
	} else {
		res.status(403).json({
			status: 'failed',
			message: 'Not authorized.',
		});
	}
};

export { createOrder, displayOrders };
