export enum Categories {
	Men = 'men',
	Women = 'women',
	Kids = 'kids',
}

export interface IProduct {
	id: string;
	title: string;
	price: number;
	description?: string;
	category: Categories;
	images: string[];
	colors: string[];
	sizes: string[];
}

export type IProductDto = IProduct;

export type CreateBody = Pick<IProduct, 'price' | 'category' | 'description' | 'title' | 'images' | 'colors' | 'sizes'>;
