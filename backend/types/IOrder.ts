import { ObjectId } from 'mongoose';
import { IProduct } from './IProduct';

export interface IOrderProduct {
	id: string;
	selectedColor: string;
	selectedSize: string;
}

export interface IOrder {
	id: string;
	userID: ObjectId;
	firstName: string;
	lastName: string;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	products: (IProduct & IOrderProduct)[];
	total: number;
	date: string;
}

export type CreateBody = Omit<IOrder, 'id' | 'userID' | 'postalCode' | 'date' | 'total' | 'products'> & {
	products: IOrderProduct[];
};
