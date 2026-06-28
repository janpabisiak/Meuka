import { ObjectId } from 'mongoose';
import { IProduct } from './IProduct';

export interface IOrder {
	id: string;
	userID: ObjectId;
	firstName: string;
	lastName: string;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	products: IProduct[];
	total: number;
	date: string;
}

export type CreateBody = Omit<IOrder, 'id' | 'userID' | 'postalCode' | 'products' | 'date'> & { products: number[] };
