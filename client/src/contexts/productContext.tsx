import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import IProduct from '../interfaces/IProduct';

interface IState {
	products: IProduct[];
	total: number;
	isLoading: boolean;
}

type Action = { type: 'products/set'; payload: { products: IProduct[]; total: number } } | { type: 'products/isLoading'; payload: boolean };

const initialState: IState = {
	products: [],
	total: 0,
	isLoading: true,
};

function reducer(state: IState, action: Action) {
	switch (action.type) {
		case 'products/set':
			return { ...state, products: action.payload.products, total: action.payload.total };
		case 'products/isLoading':
			return { ...state, isLoading: action.payload as boolean };
		default:
			return state;
	}
}

const ProductContext = createContext<{ state: IState; dispatch: Dispatch<Action> } | undefined>(undefined);

function ProductProvider({ children }: { children: ReactNode }) {
	const [{ products, total, isLoading }, dispatch] = useReducer<React.Reducer<IState, Action>>(reducer, initialState);

	return <ProductContext.Provider value={{ state: { products, total, isLoading }, dispatch }}>{children}</ProductContext.Provider>;
}

function useProduct() {
	const context = useContext(ProductContext);
	if (!context) throw new Error('ProductContext used outside of ProductProvider scope.');
	return context;
}

export { ProductProvider, useProduct };
