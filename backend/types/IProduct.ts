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

export type IProductDto = IProduct;

export type CreateBody = Pick<IProduct, 'price' | 'category' | 'description' | 'title' | 'images' | 'colors' | 'sizes'>;
