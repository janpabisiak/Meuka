import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import User from '../models/userSchema';

const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const user = await User.findById(id).select('-__v');

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
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'error',
			error: err,
		});
	}
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await User.find().select('-__v');

		if (users.length) {
			res.status(200).json({
				status: 'success',
				data: users,
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

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
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
		res.status(201).json({
			status: 'success',
			data: newUser,
		});
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
		const { email, password } = req.body;

		const user = await User.findOne({ email: email });

		if (user) {
			const passwordHash = CryptoJS.SHA256(password).toString();

			if (user.password == passwordHash) {
				res.status(200).json({
					status: 'success',
					data: user,
				});
				return;
			}
		}

		res.status(403).json({
			status: 'failed',
			message: 'E-mail or password is incorrect.',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
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

export { getUser, getUsers, createUser, loginUser, deleteUser };
