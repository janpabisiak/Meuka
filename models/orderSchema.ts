import mongoose from 'mongoose';
import IOrder from '../interfaces/IOrder';
const { Schema } = mongoose;

const orderSchema = new Schema<IOrder>({
	userID: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	products: {
		type: [Object],
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
});

export default mongoose.model<IOrder>('Order', orderSchema, 'orders');
