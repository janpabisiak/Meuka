import mongoose from 'mongoose';
const { Schema } = mongoose;

interface IProduct {
	title: string;
	price: number;
	description: string;
	category: string;
	images: string[];
	colors: string[];
	sizes: number[];
}

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
		type: [Number],
		required: true,
	},
});

export default mongoose.model<IProduct>('Product', productSchema, 'items');
