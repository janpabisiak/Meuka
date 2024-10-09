import axios from 'axios';
import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';

// Define a Product interface for each product in the array
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

// The state now holds an array of products
interface IState {
	products: IProduct[];
}

// Action now handles setting an array of products
interface IAction {
	type: 'products/set';
	payload: IProduct[];
}

// Initial state with an empty array of products
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

// ProductContext now holds an array of products in the state
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
