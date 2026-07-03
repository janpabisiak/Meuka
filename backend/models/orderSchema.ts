import mongoose from 'mongoose';
import { IOrder } from '../types/IOrder';
const { Schema } = mongoose;

const orderSchema = new Schema<IOrder>({
	userID: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	firstName: {
		type: String,
		required: [true, 'First name is required.'],
		maxLength: [50, 'First name must be less than 50 characters long.'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required.'],
		maxLength: [50, 'Last name must be less than 50 characters long.'],
	},
	address: {
		type: String,
		required: [true, 'Address is required.'],
		maxLength: [150, 'Address must be less than 150 characters long.'],
	},
	city: {
		type: String,
		required: [true, 'City is required.'],
		maxLength: [50, 'City must be less than 50 characters long.'],
	},
	country: {
		type: String,
		required: [true, 'Country is required.'],
		maxLength: [60, 'Country must be less than 60 characters long.'],
	},
	products: {
		type: [Object],
		required: [true, 'At least one product is required.'],
	},
	total: {
		type: Number,
		required: [true, 'Total is required.'],
		min: [0, 'Total must not be lower than 0.'],
	},
	date: {
		type: String,
		default: () => new Date().toISOString(),
	},
});

export default mongoose.model<IOrder>('Order', orderSchema, 'orders');
