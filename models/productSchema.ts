import mongoose from 'mongoose';
const { Schema } = mongoose;

interface IProduct {
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
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
	image: {
		type: String,
		required: true,
	},
});

export default mongoose.model<IProduct>('Product', productSchema, 'items');
