import { BCRYPT_ROUNDS, JWT_EXPIRES_IN, JWT_SECRET_KEY } from '../config';
import User from '../models/userSchema';
import { IUser, IUserDto } from '../types/IUser';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from '../utils/httpError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { capitalizeString } from '../utils/capitalizeString';

export const getUserById = async (userId?: string): Promise<IUserDto> => {
	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	return toDto(user);
};

export const createUser = async (
	username: string,
	email: string,
	password: string,
	firstName: string,
	lastName: string,
): Promise<{ user: IUserDto; token: string }> => {
	const existingUser = await User.findOne({ $or: [{ username }, { email }] });

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
	} as IUser;

	const user = await User.create(newUser);
	const token = createToken(user.id as string);

	return { user: toDto(user), token };
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUserDto; token: string }> => {
	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new HttpError(HttpResponseStatuses.AccessDenied, HttpResponseTypes.Failed, 'E-mail or password is incorrect');
	}

	return { user: toDto(user), token: createToken(user.id as string) };
};

export const changePassword = async (oldPassword: string, newPassword: string, userId?: string): Promise<IUserDto | null> => {
	const user = await User.findById(userId).select('+password');

	if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
		throw new HttpError(HttpResponseStatuses.AccessDenied, HttpResponseTypes.Failed, 'Password is incorrect');
	}

	const updatedUser = await User.findByIdAndUpdate(userId, { password: await bcrypt.hash(newPassword, BCRYPT_ROUNDS) }, { new: true });

	return updatedUser ? toDto(updatedUser) : null;
};

export const updateUser = async (firstName: string, lastName: string, email: string, userId?: string): Promise<IUserDto | null> => {
	const user = await User.findById(userId);

	if (!user) {
		throw new HttpError(HttpResponseStatuses.NotFound, HttpResponseTypes.Failed, 'There is no user with provided id');
	}

	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{
			firstName: capitalizeString(firstName),
			lastName: capitalizeString(lastName),
			email,
		},
		{ new: true },
	);

	return updatedUser ? toDto(updatedUser) : null;
};

export const deleteUser = async (id: string, userId?: string): Promise<void> => {
	const user = await User.findById(id);

	if (!user || user.id !== userId) {
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
		{ expiresIn: JWT_EXPIRES_IN },
	);
};

const toDto = (user: IUser): IUserDto => {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	};
};
