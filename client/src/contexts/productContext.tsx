import axios from 'axios';
import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

export interface IProduct {
	_id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	images: string[];
	colors: string[];
	sizes: string[];
}

interface IState {
	products: IProduct[];
	isLoading: boolean;
}

interface IAction {
	type: 'products/set' | 'products/isLoading';
	payload: IProduct[];
}

const initialState: IState = {
	products: [],
	isLoading: true,
};

function reducer(state: IState, action: IAction) {
	switch (action.type) {
		case 'products/set':
			return { ...state, products: action.payload };
		case 'products/isLoading':
			return { ...state, isLoading: action.payload };
		default:
			return state;
	}
}

const ProductContext = createContext<{ state: IState; dispatch: Dispatch<IAction> } | undefined>(undefined);

function ProductProvider({ children }: { children: ReactNode }) {
	const [{ products, isLoading }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		async function fetchProducts() {
			dispatch({ type: 'products/isLoading', payload: true });
			const response = await axios({ url: import.meta.env.VITE_API_LINK + '/products', method: 'get' });
			dispatch({ type: 'products/set', payload: response.data.data });
			dispatch({ type: 'products/isLoading', payload: false });
		}

		fetchProducts();
	}, []);

	return <ProductContext.Provider value={{ products, isLoading, dispatch }}>{children}</ProductContext.Provider>;
}

function useProduct() {
	const context = useContext(ProductContext);
	if (!context) throw new Error('ProductContext used outside of ProductProvider scope.');
	return context;
}

export { ProductProvider, useProduct };
