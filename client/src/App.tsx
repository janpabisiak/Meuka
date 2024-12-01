import './line-awesome.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RootLayout from './pages/RootLayout';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import { UserProvider } from './contexts/userContext';
import { ProductProvider } from './contexts/productContext';
import Order from './pages/Order';

function App() {
	return (
		<UserProvider>
			<ProductProvider>
				<Toaster
					position="bottom-left"
					reverseOrder={true}
					toastOptions={{
						success: {
							duration: 3000,
							style: {
								fontSize: '1.8rem',
							},
						},
						error: {
							duration: 5000,
							style: {
								fontSize: '1.8rem',
							},
						},
					}}
				/>
				<BrowserRouter>
					<Routes>
						<Route element={<RootLayout />}>
							<Route index element={<Category />} />
							<Route path=":category" element={<Category />} />
							<Route path="product/:id" element={<Product />} />
							<Route path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
							<Route path="orders" element={<Orders />} />
							<Route path="order/:id" element={<Order />} />
							<Route path="settings" element={<Settings />} />
							<Route path="cart" element={<Cart />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ProductProvider>
		</UserProvider>
	);
}

export default App;
