import { createContext, ReactNode, useContext, useReducer, Dispatch, useEffect } from 'react';
import axios from 'axios';

interface IState {
	_id: string;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	isAuthenticated: boolean;
}

interface IAction {
	type: 'user/set' | 'user/logout';
	payload?: Partial<IState>;
}

const initialState: IState = {
	_id: '',
	username: '',
	email: '',
	firstName: '',
	lastName: '',
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
				const response = await axios({
					url: import.meta.env.VITE_API_LINK + '/users',
					method: 'get',
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
					timeout: import.meta.env.VITE_API_TIMEOUT,
				});

				dispatch({ type: 'user/set', payload: response.data.data });
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
