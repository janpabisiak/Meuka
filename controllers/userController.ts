import 'dotenv/config';
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema';
import { validationResult } from 'express-validator';

interface TokenPayload {
	username: string;
	iat: number;
	exp: number;
}

const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.headers['authorization']?.split(' ')[1];
		if (token) {
			const { username } = jwt.verify(token, process.env.JWT_SECRET_KEY!) as TokenPayload;

			const user = await User.findOne({ username }).select('-__v -password');

			if (user) {
				res.status(200).json({
					status: 'success',
					data: user,
				});
			} else {
				res.status(404).json({
					status: 'failed',
					message: 'There is no user with this id.',
				});
			}
		} else {
			res.status(403).json({
				status: 'failed',
				message: 'Unauthorized operation.',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'error',
			error: (err as Error).message,
		});
	}
};

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({
				status: 'failed',
				errors: errors.array(),
			});
		} else {
			const { username, email, password, firstName, lastName } = req.body;
			const user = await User.findOne({ $or: [{ username }, { email }] });

			if (user) {
				res.status(400).json({
					status: 'failed',
					message: 'There is already user with entered username or e-mail address.',
				});
				return;
			}

			const passwordHash = CryptoJS.SHA256(password).toString();

			const newUser = {
				username,
				email,
				password: passwordHash,
				firstName,
				lastName,
			};

			await User.create(newUser);

			const token = jwt.sign(
				{
					username: newUser.username,
				},
				process.env.JWT_SECRET_KEY!,
				{ expiresIn: '7d' }
			);

			res.status(201).json({
				status: 'success',
				data: newUser,
				token,
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

const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({
				status: 'failed',
				errors: errors.array(),
			});
		} else {
			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (user) {
				const passwordHash = CryptoJS.SHA256(password).toString();

				if (user.password == passwordHash) {
					const token = jwt.sign(
						{
							username: user.username,
						},
						process.env.JWT_SECRET_KEY!,
						{ expiresIn: '7d' }
					);

					res.status(200).json({
						status: 'success',
						data: user,
						token,
					});
					return;
				}
			}

			res.status(403).json({
				status: 'failed',
				message: 'E-mail or password is incorrect.',
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

const changePassword = async (req: Request, res: Response): Promise<void> => {
	try {
		const token = req.headers['authorization']?.split(' ')[1];

		if (token) {
			const { currentPassword, newPassword } = req.body;
			const { username } = jwt.verify(token, process.env.JWT_SECRET_KEY!) as TokenPayload;

			const currentPasswordHash = CryptoJS.SHA256(currentPassword).toString();
			const user = await User.findOne({ username: username });
			if (user) {
				if (user.password === currentPasswordHash) {
					const newPasswordHash = CryptoJS.SHA256(newPassword).toString();
					await User.findOneAndUpdate({ username: username }, { password: newPasswordHash });

					res.status(201).json({
						status: 'success',
						message: 'Password successfully changed.',
					});
				} else {
					res.status(403).json({
						status: 'failed',
						message: 'Provided password is not correct',
					});
				}
			} else {
				res.status(404).json({
					status: 'failed',
					message: 'There is no user with this id.',
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

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const user = await User.findByIdAndDelete({ id });

		if (user) {
			res.status(201).json({
				status: 'success',
			});
		} else {
			res.status(404).json({
				status: 'failed',
				message: 'There is no user with this id.',
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

export { getUser, createUser, loginUser, changePassword, deleteUser };
