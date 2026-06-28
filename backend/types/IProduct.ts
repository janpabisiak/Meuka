export interface IProduct {
	id: string;
	title: string;
	price: number;
	description?: string;
	category: string;
	images: string[];
	colors: string[];
	sizes: string[];
}

export type CreateBody = Pick<IProduct, 'price' | 'category' | 'description'> & { name: string };
