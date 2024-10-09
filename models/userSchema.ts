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
			minLength: [6, 'Username must be at least 6 characters long.'],
			maxLength: [16, 'Username must be less than 16 characters long.'],
			validate: {
				validator: function (v) {
					return /^[a-zA-Z0-9]+$/.test(v);
				},
				message: (props) => `${props.value} is not a valid username! Alphanumeric characters only.`,
			},
		},
		email: {
			type: String,
			required: [true, 'E-mail address is required.'],
			unique: true,
			validate: {
				validator: function (v) {
					return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
				},
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
			minLength: [8, 'Password must be at least 8 characters long.'],
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
