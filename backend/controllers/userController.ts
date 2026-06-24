import { Response } from 'express';
import { IHttpRequest } from '../types/IHttpRequest';
import { catchError } from '../utils/catchError';
import sendResponse from '../utils/sendResponse';
import * as userService from '../services/userService';

const getUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const userId = req.userId!;

	req.log.info({ userId }, 'User fetch attempt.');
	return sendResponse(res, 200, 'success', 'User successfully fetched', await userService.getUserById(userId));
});

const createUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { username, email, password, firstName, lastName } = req.body;

	req.log.info({ username, email, password, firstName, lastName }, 'User creation attempt.');
	const { user, token } = await userService.createUser(username, email, password, firstName, lastName);
	return sendResponse(res, 201, 'success', 'User successfully created', user, token);
});

const loginUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { email, password } = req.body;

	req.log.info({ email, password }, 'User login attempt.');
	const { user, token } = await userService.loginUser(email, password);
	return sendResponse(res, 200, 'success', 'User successfully logged in', user, token);
});

const changePassword = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { currentPassword, newPassword } = req.body;
	const userId = req.userId!;

	req.log.info({ currentPassword, newPassword, userId }, 'Password change attempt.');
	return sendResponse(
		res,
		201,
		'success',
		'Password successfully changed',
		await userService.changePassword(currentPassword, newPassword, userId),
	);
});

const updateUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { firstName, lastName, email } = req.body;
	const userId = req.userId!;

	req.log.info({ firstName, lastName, email, userId }, 'User update attempt.');
	return sendResponse(res, 201, 'success', 'User successfully updated', await userService.updateUser(firstName, lastName, email, userId));
});

const deleteUser = catchError(async (req: IHttpRequest, res: Response): Promise<void> => {
	const { id } = req.params;
	const userId = req.userId!;

	req.log.info({ id, userId }, 'User deletion attempt.');
	await userService.deleteUser(id, userId);
	return sendResponse(res, 204, 'success', 'User successfully deleted');
});

export { changePassword, createUser, deleteUser, getUser, loginUser, updateUser };
