import mongoose from 'mongoose';
import IProduct from '../interfaces/IProduct';
const { Schema } = mongoose;

const productSchema = new Schema<IProduct>({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	images: {
		type: [String],
		required: true,
	},
	colors: {
		type: [String],
		required: true,
	},
	sizes: {
		type: [String],
		required: true,
	},
});

export default mongoose.model<IProduct>('Product', productSchema, 'items');
