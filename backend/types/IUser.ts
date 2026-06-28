export interface IUser {
	id: string;
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export type IUserDto = Omit<IUser, 'password'>;

export type RegisterBody = Omit<IUser, 'id'> & Required<Pick<IUser, 'password'>>;

export type LoginBody = Required<Pick<IUser, 'email' | 'password'>>;

export interface ChangePasswordBody {
	currentPassword: string;
	newPassword: string;
}

export type UpdateBody = Pick<IUser, 'email' | 'firstName' | 'lastName'>;
