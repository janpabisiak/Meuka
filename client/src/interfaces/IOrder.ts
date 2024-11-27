import ICartProduct from './ICartProduct';
interface IOrder {
	_id: string;
	userID: string;
	firstName: string;
	lastName: string;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	products: ICartProduct[];
	total: number;
	date?: string;
}

export default IOrder;
