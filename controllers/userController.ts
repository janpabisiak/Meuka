import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import User from '../models/userSchema';

const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const user = await User.findById(id).select('-__v');

		if (user) {
			res.json({
				status: 'success',
				data: user,
			});
		} else {
			res.json({
				status: 'failed',
				message: 'There is no user with this id.',
			});
		}
	} catch (err) {
		console.log(err);
		res.json({
			status: 'error',
			error: err,
		});
	}
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await User.find().select('-__v');

		if (users.length) {
			res.json({
				status: 'success',
				data: users,
			});
		} else {
			res.json({
				status: 'failed',
				message: 'There is no data to send.',
			});
		}
	} catch (err) {
		console.log(err);
		res.json({
			status: 'error',
			error: err,
		});
	}
};

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, email, password, firstName, lastName } = req.body;

		const user = await User.findOne({ $or: [{ username }, { email }] });

		if (user) {
			res.json({
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
		res.json({
			status: 'success',
			data: newUser,
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: 'error',
			error: err,
		});
	}
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });

		if (user) {
			const passwordHash = CryptoJS.SHA256(password).toString();

			if (user.password == passwordHash) {
				res.json({
					status: 'success',
					data: user,
				});
				return;
			}
		}

		res.json({
			status: 'failed',
			message: 'E-mail or password is incorrect.',
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: 'error',
			error: err,
		});
	}
};

// const updateUser = async (req: Request, res: Response): Promise<void> => {
// 	try {
// 		const { id } = req.params;
// 		const { email, password, firstName, lastName } = req.body;

//         const user = await User.findOne({email: email});

//         if (user) {
// 			res.json({
// 				status: 'failed',
// 				message: 'There is already user with entered username or e-mail address.',
// 			});
// 			return;
// 		}

//         const newUser = {

//         }

// 		await User.findByIdAndUpdate(id);
// 	} catch (err) {
// 		console.log(err);
// 		res.json({
// 			status: 'error',
// 			message: err,
// 		});
// 	}
// };

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const user = await User.findByIdAndDelete({ id });

		if (user) {
			res.json({
				status: 'success',
			});
		} else {
			res.json({
				status: 'failed',
				message: 'There is no user with this id.',
			});
		}
	} catch (err) {
		console.log(err);
		res.json({
			status: 'error',
			error: err,
		});
	}
};

export { getUser, getUsers, createUser, loginUser, deleteUser };
