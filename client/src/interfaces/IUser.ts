import ICartProduct from './ICartProduct';
import IOrder from './IOrder';

interface IUser {
	_id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	cart: ICartProduct[];
	orders: IOrder[];
	color?: string;
	size?: string;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export default IUser;
