import { BCRYPT_ROUNDS, JWT_SECRET_KEY } from '../config';
import User from '../models/userSchema';
import IUser from '../types/IUser';
import capitalizeString from '../utils/capitalizeString';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getUserById = async (userId: string): Promise<IUser> => {
	const user = await User.findById(userId).select('-__v -password');

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	return user;
};

const createUser = async (username: string, email: string, password: string, firstName: string, lastName: string): Promise<{ user: IUser; token: string }> => {
	const existingUser = await User.findOne({ $or: [{ username }, { email }] }).select('-__v -password');

	if (existingUser) {
		throw new HttpError(
			HttpResponseStatuses.BadRequest,
			HttpResponseTypes.Failed,
			'There is already user with entered username or e-mail address',
		);
	}

	const newUser = {
		username,
		email,
		password: await bcrypt.hash(password, BCRYPT_ROUNDS),
		firstName: capitalizeString(firstName),
		lastName: capitalizeString(lastName),
	};

	const user = await User.create(newUser);
	const token = createToken(user._id.toString());

	return { user, token };
};

const loginUser = async (email: string, password: string): Promise<{ user: IUser; token: string }> => {
	const user = await User.findOne({ email }).select('-__v');

	if (!user || !(await bcrypt.compare(password, user?.password))) {
		throw new HttpError(HttpResponseStatuses.AccessDenied, HttpResponseTypes.Failed, 'E-mail or password is incorrect');
	}

	return { user, token: createToken(user._id.toString()) };
};

const changePassword = async (oldPassword: string, newPassword: string, userId: string): Promise<IUser | null> => {
	const user = await User.findById(userId).select('-__v');

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	if (!user || !(await bcrypt.compare(oldPassword, user?.password))) {
		throw new HttpError(HttpResponseStatuses.AccessDenied, HttpResponseTypes.Failed, 'Password is incorrect');
	}

	return await User.findByIdAndUpdate(userId, { password: await bcrypt.hash(newPassword, BCRYPT_ROUNDS) }, { new: true });
};

const updateUser = async (firstName: string, lastName: string, email: string, userId: string): Promise<IUser | null> => {
	const user = await User.findById(userId).select('-__v -password');

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	return await User.findByIdAndUpdate(
		userId,
		{
			firstName: capitalizeString(firstName),
			lastName: capitalizeString(lastName),
			email,
		},
		{ new: true },
	);
};

const deleteUser = async (id: string, userId: string): Promise<void> => {
	const user = await User.findById(id);

	if (!user || user?._id.toString() !== userId) {
		throw new HttpError(HttpResponseStatuses.NotAuthorized, HttpResponseTypes.Failed);
	}

	await User.deleteOne({ _id: id });
};

const createToken = (userId: string): string => {
	return jwt.sign(
		{
			userId,
		},
		JWT_SECRET_KEY,
		{ expiresIn: '7d' },
	);
};

export { getUserById, createUser, loginUser, changePassword, updateUser, deleteUser };
