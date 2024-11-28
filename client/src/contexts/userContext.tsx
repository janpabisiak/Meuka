import { createContext, ReactNode, useContext, useReducer, Dispatch, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import sendRequest from '../utils/sendRequest';
import IOrder from '../interfaces/IOrder';
import IUser from '../interfaces/IUser';
import ICartProduct from '../interfaces/ICartProduct';

interface IAction {
	type: 'user/set' | 'user/isLoading' | 'user/logout' | 'cart/sync' | 'cart/add' | 'cart/delete' | 'cart/reset' | 'sync';

	payload?: Partial<IUser> | [Partial<IUser>, IOrder[]] | boolean | number | ICartProduct;
}

const initialState: IUser = {
	_id: '',
	username: '',
	email: '',
	firstName: '',
	lastName: '',
	cart: [],
	orders: [],
	isAuthenticated: false,
	isLoading: false,
	isSyncNeeded: false,
};

function reducer(state: IUser, action: IAction): IUser {
	switch (action.type) {
		case 'user/set':
			return {
				...state,
				...(action.payload && Array.isArray(action.payload) ? action.payload[0] : {}),
				orders: action.payload && Array.isArray(action.payload) ? action.payload[1] : [],
				isAuthenticated: true,
			};
		case 'user/isLoading':
			return {
				...state,
				isLoading: Boolean(action.payload),
			};
		case 'user/logout':
			localStorage.removeItem('token');
			return initialState;
		case 'cart/sync':
			return {
				...state,
				cart: action.payload as ICartProduct[],
			};
		case 'cart/add':
			return {
				...state,
				cart: [...state.cart, action.payload as ICartProduct],
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
		case 'sync':
			return {
				...state,
				isSyncNeeded: action.payload as boolean,
			};
		default:
			return state;
	}
}

const UserContext = createContext<
	| {
			state: IUser;
			handleLogout: () => void;
			dispatch: Dispatch<IAction>;
	  }
	| undefined
>(undefined);

// Provider to wrap the application and provide the user state and dispatch function
function UserProvider({ children }: { children: ReactNode }) {
	const [{ _id, username, email, firstName, lastName, cart, orders, isAuthenticated, isLoading, isSyncNeeded }, dispatch] = useReducer(
		reducer,
		initialState
	);

	// Fetch user data on mount
	useEffect(() => {
		async function fetchData() {
			dispatch({ type: 'user/isLoading', payload: true });

			const token = localStorage.getItem('token');
			if (token || isSyncNeeded) {
				try {
					const responses: [AxiosResponse<{ data: IUser }>, AxiosResponse<{ data: IOrder[] }>] = [
						await sendRequest({ route: '/users', method: 'get', token: token! }),
						await sendRequest({ route: '/orders', method: 'get', token: token! }),
					];

					const data = responses.map((response) => {
						const {
							data: { data },
						} = response;

						return data;
					});

					if (Array.isArray(data[1])) {
						data[1] = data[1].reverse();
					}
					if (data.length === 2) {
						dispatch({ type: 'user/set', payload: data as [IUser, IOrder[]] });
					} else {
						console.error('Unexpected data format:', data);
						toast.error('Failed to fetch user data');
					}
				} catch (err) {
					console.error('Error fetching user data:', err);
					toast.error('Failed to fetch user data');
				}
			}

			dispatch({ type: 'user/isLoading', payload: false });
			dispatch({ type: 'sync', payload: false });

			// Sync cart with localStorage
			if (localStorage.getItem('cart')) dispatch({ type: 'cart/sync', payload: JSON.parse(localStorage.getItem('cart')!) });
		}

		fetchData();
	}, [firstName, lastName, email, isAuthenticated, isSyncNeeded]);

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
				state: {
					_id,
					username,
					email,
					firstName,
					lastName,
					cart,
					orders,
					isAuthenticated,
					isLoading,
				},
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
