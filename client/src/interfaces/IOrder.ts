import IProduct from './IProduct';

interface IOrder {
	userID: string;
	firstName: string;
	lastName: string;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	products: IProduct[];
	total: number;
	date?: string;
}

export default IOrder;
