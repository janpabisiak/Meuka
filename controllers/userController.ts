import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema';
import sendResponse from '../utils/sendResponse';
import verifyToken from '../utils/verifyToken';
import handleValidationErrors from '../utils/handleValidationErrors';
import compareHashes from '../utils/compareHashes';
import hashPassword from '../utils/hashPassword';
import capitalizeString from '../utils/capitalizeString';

const getUser = async (req: Request, res: Response) => {
	try {
		const payload = verifyToken(req, res);
		if (!payload) return;

		const user = await User.findOne({ username: payload.username }).select('-__v -password');

		if (!user) return sendResponse(res, 404, 'failed', 'There is no user with this id');

		return sendResponse(res, 200, 'success', 'User successfully fetched', user);
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const { username, email, password, firstName, lastName } = req.body;
		const existingUser = await User.findOne({ $or: [{ username }, { email }] }).select('-__v -password');

		if (existingUser) return sendResponse(res, 400, 'failed', 'There is already user with entered username or e-mail address');

		const newUser = {
			username,
			email,
			password: await hashPassword(password),
			firstName: capitalizeString(firstName),
			lastName: capitalizeString(lastName),
		};

		await User.create(newUser);

		const token = jwt.sign(
			{
				username: newUser.username,
			},
			process.env.JWT_SECRET_KEY!,
			{ expiresIn: '7d' }
		);

		return sendResponse(res, 201, 'success', 'User successfully created', newUser, token);
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

const loginUser = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const { email, password } = req.body;
		const user = await User.findOne({ email }).select('-__v');

		if (!user) return sendResponse(res, 403, 'failed', 'E-mail or password is incorrect');

		if (!(await compareHashes(password, user.password))) return sendResponse(res, 403, 'failed', 'E-mail or password is incorrect');

		const token = jwt.sign(
			{
				username: user.username,
			},
			process.env.JWT_SECRET_KEY!,
			{ expiresIn: '7d' }
		);

		return sendResponse(res, 200, 'success', 'User successfully logged in', user, token);
	} catch (err) {
		return sendResponse(res, 500, 'error', (err as Error).message);
	}
};

const changePassword = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const payload = verifyToken(req, res);
		if (!payload) return;

		const { currentPassword, newPassword } = req.body;
		const user = await User.findOne({ username: payload.username }).select('-__v');

		if (!user) return sendResponse(res, 404, 'failed', 'There is no user with this id');

		if (await compareHashes(currentPassword, user.password))
			return sendResponse(res, 403, 'failed', 'Provided password is not correct');

		await User.findOneAndUpdate({ username: payload.username }, { password: hashPassword(newPassword) });

		return sendResponse(res, 201, 'success', 'Password successfully changed');
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const payload = verifyToken(req, res);
		if (!payload) return;

		const { firstName, lastName, email } = req.body;
		const user = await User.findOne({ username: payload.username }).select('-__v -password');

		if (!user) return sendResponse(res, 404, 'failed', 'There is no user with this id');

		await User.findOneAndUpdate(
			{ username: payload.username },
			{
				firstName: capitalizeString(firstName),
				lastName: capitalizeString(lastName),
				email,
			}
		);

		return sendResponse(res, 201, 'success', 'Use successfully updated');
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		if (!handleValidationErrors(req, res)) return;

		const { id } = req.params;
		const user = await User.findByIdAndDelete({ id });

		if (!user) return sendResponse(res, 404, 'failed', 'There is no user with this id');

		return sendResponse(res, 201, 'success', 'User successfully deleted');
	} catch (err) {
		console.log(err);
		return sendResponse(res, 500, 'error', 'An unexpected error happened. Try again later');
	}
};

export { getUser, createUser, loginUser, changePassword, updateUser, deleteUser };
