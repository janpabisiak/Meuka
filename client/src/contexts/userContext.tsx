import { createContext, ReactNode, useContext, useReducer, Dispatch, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ISelectedProduct {
	_id: string;
	color: string;
	size: string;
}

interface IState {
	_id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	cart: ISelectedProduct[];
	cartLength: number;
	favorites: ISelectedProduct[];
	color?: string;
	size?: string;
	isAuthenticated: boolean;
}

interface IAction {
	type: 'user/set' | 'user/logout' | 'cart/sync' | 'cart/add' | 'cart/delete';
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
	favorites: [],
	isAuthenticated: false,
};

function reducer(state: IState, action: IAction): IState {
	switch (action.type) {
		case 'user/set':
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
			};
		case 'user/logout':
			return initialState;
		case 'cart/sync':
			return {
				...state,
				cart: action.payload as ISelectedProduct[],
				cartLength: action.payload!.length,
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
	const [{ _id, username, email, firstName, lastName, cart, cartLength, favorites, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function fetchUserData() {
			if (localStorage.getItem('token')) {
				try {
					const response = await axios({
						url: import.meta.env.VITE_API_LINK + '/users',
						method: 'get',
						headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
						timeout: import.meta.env.VITE_API_TIMEOUT,
					});

					dispatch({ type: 'user/set', payload: response.data.data });
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
			value={{ _id, username, email, firstName, lastName, cart, cartLength, favorites, isAuthenticated, handleLogout, dispatch }}
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
