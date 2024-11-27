import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react';
import sendRequest from '../utils/sendRequest';
import IProduct from '../interfaces/IProduct';

interface IState {
	products: IProduct[];
	isLoading: boolean;
}

interface IAction {
	type: 'products/set' | 'products/isLoading';
	payload: IProduct[] | boolean;
}

const initialState: IState = {
	products: [],
	isLoading: true,
};

function reducer(state: IState, action: IAction) {
	switch (action.type) {
		case 'products/set':
			return { ...state, products: action.payload as IProduct[] };
		case 'products/isLoading':
			return { ...state, isLoading: action.payload as boolean };
		default:
			return state;
	}
}

const ProductContext = createContext<{ state: IState; dispatch: Dispatch<IAction> } | undefined>(undefined);

// Provider to wrap the application and provide the product state and dispatch function
function ProductProvider({ children }: { children: ReactNode }) {
	const [{ products, isLoading }, dispatch] = useReducer<React.Reducer<IState, IAction>>(reducer, initialState);

	// Fetch products on component mount
	useEffect(() => {
		async function fetchProducts() {
			dispatch({ type: 'products/isLoading', payload: true });
			const response = await sendRequest({ route: '/products', method: 'get' });
			dispatch({ type: 'products/set', payload: (response.data as { data: IProduct[] }).data });
			dispatch({ type: 'products/isLoading', payload: false });
		}

		fetchProducts();
	}, []);

	return <ProductContext.Provider value={{ state: { products, isLoading }, dispatch }}>{children}</ProductContext.Provider>;
}

// Hook to use the product context
function useProduct() {
	const context = useContext(ProductContext);
	if (!context) throw new Error('ProductContext used outside of ProductProvider scope.');
	return context;
}

export { ProductProvider, useProduct };
