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
	city: string;
	country: string;
	products: (IProduct & IOrderProduct)[];
	total: number;
	date: string;
}

export type IOrderDto = IOrder;

export type CreateBody = Omit<IOrder, 'id' | 'userID' | 'date' | 'total' | 'products'> & {
	products: IOrderProduct[];
};
