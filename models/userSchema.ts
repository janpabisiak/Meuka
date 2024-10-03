import mongoose from 'mongoose';
const { Schema } = mongoose;

interface IUser {
	username: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

const userSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: [true, 'Username is required.'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'E-mail address is required.'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
		},
		firstName: {
			type: String,
			required: [true, 'First name is required.'],
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required.'],
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema, 'users');
