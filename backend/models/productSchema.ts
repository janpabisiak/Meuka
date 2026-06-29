import mongoose from 'mongoose';
import { IProduct } from '../types/IProduct';
const { Schema } = mongoose;

const productSchema = new Schema<IProduct>({
	title: {
		type: String,
		required: [true, 'Title is required.'],
		minLength: [5, 'Title must be at least 5 characters long.'],
		maxLength: [100, 'Title must be less than 100 characters long.'],
	},
	price: {
		type: Number,
		required: [true, 'Price is required.'],
		min: [0.01, 'Price must be greater than 0.'],
	},
	description: {
		type: String,
		maxLength: [1000, 'Description must be less than 1000 characters long.'],
	},
	category: {
		type: String,
		required: [true, 'Category is required.'],
		enum: ['Men', 'Women', 'Kids'],
	},
	images: {
		type: [String],
		required: [true, 'At least one image is required.'],
	},
	colors: {
		type: [String],
		required: [true, 'At least one color is required.'],
	},
	sizes: {
		type: [String],
		required: [true, 'At least one size is required.'],
	},
});

export default mongoose.model<IProduct>('Product', productSchema, 'items');
