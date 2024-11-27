import { createContext, ReactNode, useContext, useReducer, Dispatch, useEffect } from 'react';
import toast from 'react-hot-toast';
import sendRequest from '../utils/sendRequest';
import IOrder from '../interfaces/IOrder';
import ISelectedProduct from '../interfaces/ISelectedProduct';
interface IState {
	_id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	cart: ISelectedProduct[];
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
	orders: [],
	isAuthenticated: false,
	isLoading: true,
};

function reducer(state: IState, action: IAction): IState {
	switch (action.type) {
		case 'user/set':
			return {
				...state,
				...action.payload[0],
				orders: action.payload[1],
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
			};
		case 'cart/add':
			return {
				...state,
				cart: [...state.cart, action.payload as ISelectedProduct],
			};
		case 'cart/delete':
			localStorage.setItem('cart', JSON.stringify(state.cart.filter((_, id) => id !== action.payload)));
			return {
				...state,
				cart: state.cart.filter((_, id) => id !== action.payload),
			};
		case 'cart/reset':
			localStorage.setItem('cart', JSON.stringify([]));
			return {
				...state,
				cart: [],
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

// Provider to wrap the application and provide the user state and dispatch function
function UserProvider({ children }: { children: ReactNode }) {
	const [{ _id, username, email, firstName, lastName, cart, orders, isAuthenticated, isLoading }, dispatch] = useReducer(
		reducer,
		initialState
	);

	// Fetch user data on mount
	useEffect(() => {
		async function fetchData() {
			dispatch({ type: 'user/isLoading', payload: true });
			if (localStorage.getItem('token')) {
				try {
					const data = [
						await sendRequest({ route: '/users', method: 'get', token: String(localStorage.getItem('token')) }),
						await sendRequest({ route: '/orders', method: 'get', token: String(localStorage.getItem('token')) }),
					].map((response) => {
						const {
							data: { data },
						} = response;

						return data;
					});

					data[1] = data[1].reverse();
					dispatch({ type: 'user/set', payload: data });
				} catch (err) {
					console.error('Error fetching user data:', err);
					toast.error('Failed to fetch user data');
				}
			}

			dispatch({ type: 'user/isLoading', payload: false });

			// Sync cart with localStorage
			if (localStorage.getItem('cart')) dispatch({ type: 'cart/sync', payload: JSON.parse(localStorage.getItem('cart')!) });
		}

		fetchData();
	}, [firstName, lastName, email, isAuthenticated]);

	// Sync cart with localStorage
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

// Hook to use the user context
function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}

export { UserProvider, useUser };
