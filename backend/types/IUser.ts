export interface IUser {
	id: string;
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export type RegisterBody = Omit<IUser, 'id'>;

export type LoginBody = Pick<IUser, 'email' | 'password'>;

export interface ChangePasswordBody {
	currentPassword: string;
	newPassword: string;
}

export type UpdateBody = Pick<IUser, 'email' | 'firstName' | 'lastName'>;
