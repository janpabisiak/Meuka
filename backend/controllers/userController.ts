import { Response } from 'express';
import * as userService from '../services/userService';
import { catchError } from '../utils/catchError';
import sendResponse from '../utils/sendResponse';
import { ChangePasswordBody, LoginBody, RegisterBody, UpdateBody } from '../types/IUser';
import { IHttpRequest } from '../types/IHttpRequest';

export const getUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const userId = req.userId;

	req.log.info({ userId }, 'User fetch attempt.');
	sendResponse(res, 200, 'success', 'User successfully fetched', await userService.getUserById(userId));
});

export const createUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const body = req.body as RegisterBody;
	const { username, email, password, firstName, lastName } = body;

	req.log.info({ username, email, password, firstName, lastName }, 'User creation attempt.');
	const { user, token } = await userService.createUser(username, email, password, firstName, lastName);
	sendResponse(res, 201, 'success', 'User successfully created', user, token);
});

export const loginUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const body = req.body as LoginBody;
	const { email, password } = body;

	req.log.info({ email, password }, 'User login attempt.');
	const { user, token } = await userService.loginUser(email, password);
	sendResponse(res, 200, 'success', 'User successfully logged in', user, token);
});

export const changePassword = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const body = req.body as ChangePasswordBody;
	const { currentPassword, newPassword } = body;
	const userId = req.userId;

	req.log.info({ currentPassword, newPassword, userId }, 'Password change attempt.');
	sendResponse(
		res,
		201,
		'success',
		'Password successfully changed',
		await userService.changePassword(currentPassword, newPassword, userId),
	);
});

export const updateUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const body = req.body as UpdateBody;
	const { firstName, lastName, email } = body;
	const userId = req.userId;

	req.log.info({ firstName, lastName, email, userId }, 'User update attempt.');
	sendResponse(res, 201, 'success', 'User successfully updated', await userService.updateUser(firstName, lastName, email, userId));
});

export const deleteUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { id } = req.params;
	const userId = req.userId;

	req.log.info({ id, userId }, 'User deletion attempt.');
	await userService.deleteUser(id, userId);
	sendResponse(res, 204, 'success', 'User successfully deleted');
});
