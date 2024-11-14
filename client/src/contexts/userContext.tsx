import { createContext, ReactNode, useContext, useReducer, Dispatch, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IProduct } from './productContext';

interface ISelectedProduct {
	_id: string;
	color: string;
	size: string;
}

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
}

interface IState {
	_id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	cart: ISelectedProduct[];
	cartLength: number;
	orders: IOrder[];
	color?: string;
	size?: string;
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface IAction {
	type: 'user/set' | 'user/isLoading' | 'user/logout' | 'cart/sync' | 'cart/add' | 'cart/delete' | 'cart/reset';
	payload?: Partial<IState>;
}

const initialState: IState = {
	_id: '',
	username: '',
	email: '',
	firstName: '',
	lastName: '',
	cart: [],
	cartLength: 0,
	orders: [],
	isAuthenticated: false,
	isLoading: true,
};

function reducer(state: IState, action: IAction): IState {
	switch (action.type) {
		case 'user/set':
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
			};
		case 'user/isLoading':
			return {
				...state,
				isLoading: Boolean(action.payload),
			};
		case 'user/logout':
			return initialState;
		case 'cart/sync':
			return {
				...state,
				cart: action.payload as ISelectedProduct[],
				cartLength: new Array(action.payload).length,
			};
		case 'cart/add':
			return {
				...state,
				cart: [...state.cart, action.payload as ISelectedProduct],
				cartLength: state.cartLength + 1,
			};
		case 'cart/delete':
			return {
				...state,
				cart: state.cart.filter((_, id) => id !== action.payload),
				cartLength: state.cartLength - 1,
			};
		case 'cart/reset':
			return {
				...state,
				cart: [],
				cartLength: 0,
			};
		default:
			return state;
	}
}

const UserContext = createContext<
	| {
			state: IState;
			handleLogout: () => void;
			dispatch: Dispatch<IAction>;
	  }
	| undefined
>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
	const [{ _id, username, email, firstName, lastName, cart, cartLength, orders, isAuthenticated, isLoading }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function fetchUserOrders() {}

		async function fetchUserData() {
			if (localStorage.getItem('token')) {
				try {
					dispatch({ type: 'user/isLoading', payload: true });
					const response = await axios({
						url: import.meta.env.VITE_API_LINK + '/users',
						method: 'get',
						headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
						timeout: import.meta.env.VITE_API_TIMEOUT,
					});

					dispatch({ type: 'user/set', payload: response.data.data });
					dispatch({ type: 'user/isLoading', payload: false });
				} catch (err) {
					console.error('Error fetching user data:', err);
					toast.error('Failed to fetch user data');
				}
			}

			if (localStorage.getItem('cart')) dispatch({ type: 'cart/sync', payload: JSON.parse(localStorage.getItem('cart')!) });
		}

		fetchUserData();
	}, []);

	useEffect(() => {
		if (cart.length) localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	function handleLogout() {
		localStorage.removeItem('token');
		dispatch({ type: 'user/logout' });
	}

	return (
		<UserContext.Provider
			value={{
				_id,
				username,
				email,
				firstName,
				lastName,
				cart,
				cartLength,
				orders,
				isAuthenticated,
				isLoading,
				handleLogout,
				dispatch,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}

export { UserProvider, useUser };
