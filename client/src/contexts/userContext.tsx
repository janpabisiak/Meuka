import { createContext, ReactNode, useContext, useReducer, Dispatch } from 'react';

interface IState {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
}

interface IAction {
	type: 'user/fetched' | 'user/logout';
	payload?: Partial<IState>;
}

const initialState: IState = {
	username: '',
	email: '',
	firstName: '',
	lastName: '',
};

function reducer(state: IState, action: IAction): IState {
	switch (action.type) {
		case 'user/fetched':
			return {
				...state,
				...action.payload,
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
			dispatch: Dispatch<IAction>;
	  }
	| undefined
>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
}

function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}

export { UserProvider, useUser };
