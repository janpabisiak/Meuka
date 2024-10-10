import { createContext, ReactNode, useContext, useReducer, Dispatch, useEffect } from 'react';
import axios from 'axios';

interface ISelectedProduct {
	_id: string;
	selectedColor: string;
	selectedSize: string;
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
	selectedColor?: string;
	selectedSize?: string;
	isAuthenticated: boolean;
}

interface IAction {
	type: 'user/set' | 'user/logout' | 'cart/add' | 'cart/delete' | 'cart/edit' | 'favorites/add' | 'favorites/delete' | 'favorites/edit';
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
		case 'cart/add':
			return {
				...state,
				cart: [...state.cart, action.payload as ISelectedProduct],
				cartLength: state.cartLength + 1,
			};
		case 'cart/delete':
			return {
				...state,
				cart: [...state.cart].filter((product) => product._id !== action.payload),
				cartLength: state.cartLength - 1,
			};
		case 'cart/edit':
			return {
				...state,
				cart: [...state.cart].map((product) => {
					if (product._id === action.payload?._id) {
						return { ...product, selectedColor: action.payload!.selectedColor, selectedSize: action.payload!.selectedSize };
					}
					return product;
				}),
			};
		case 'favorites/add':
			return {
				...state,
				favorites: [...state.favorites, action.payload as ISelectedProduct],
			};
		case 'favorites/delete':
			return {
				...state,
				favorites: [...state.favorites].filter((product) => product._id !== action.payload),
			};
		case 'favorites/edit':
			return {
				...state,
				favorites: [...state.favorites].map((product) => {
					if (product._id === action.payload?._id) {
						return { ...product, selectedColor: action.payload!.selectedColor, selectedSize: action.payload!.selectedSize };
					}
					return product;
				}),
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
	const [state, dispatch] = useReducer(reducer, initialState);

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
				}
			}
		}

		fetchUserData();
	}, []);

	function handleLogout() {
		localStorage.removeItem('token');
		dispatch({ type: 'user/logout' });
	}

	return <UserContext.Provider value={{ state, handleLogout, dispatch }}>{children}</UserContext.Provider>;
}

function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}

export { UserProvider, useUser };
