import axios from 'axios';
import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

interface IProduct {
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
}

interface IAction {
	type: 'products/set';
	payload: IProduct[];
}

const initialState: IState = {
	products: [],
};

function reducer(state: IState, action: IAction) {
	switch (action.type) {
		case 'products/set':
			return { ...state, products: action.payload };
		default:
			return state;
	}
}

const ProductContext = createContext<{ state: IState; dispatch: Dispatch<IAction> } | undefined>(undefined);

function ProductProvider({ children }: { children: ReactNode }) {
	const [{ products }, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		async function fetchProducts() {
			const response = await axios({ url: import.meta.env.VITE_API_LINK + '/products', method: 'get' });
			dispatch({ type: 'products/set', payload: response.data.data });
		}

		fetchProducts();
	}, []);

	return <ProductContext.Provider value={{ products, dispatch }}>{children}</ProductContext.Provider>;
}

function useProduct() {
	const context = useContext(ProductContext);
	if (!context) throw new Error('ProductContext used outside of ProductProvider scope.');
	return context;
}

export { ProductProvider, useProduct };
