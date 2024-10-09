import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import CategoryLayout from './pages/CategoryLayout';
import ProductLayout from './pages/ProductLayout';
import LoginLayout from './pages/LoginLayout';
import RegisterLayout from './pages/RegisterLayout';
import ForgotPasswordLayout from './pages/ForgotPasswordLayout';
import Error404 from './pages/Error404';
import OrdersLayout from './pages/OrdersLayout';
import FavoritesLayout from './pages/FavoritesLayout';
import SettingsLayout from './pages/SettingsLayout';
import CartLayout from './pages/CartLayout';
import { UserProvider } from './contexts/userContext';
import { ProductProvider } from './contexts/productContext';

function App() {
	return (
		<UserProvider>
			<ProductProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<AppLayout />} />
						<Route path="/:category" element={<CategoryLayout />} />
						<Route path="product/:id" element={<ProductLayout />} />
						<Route path="login" element={<LoginLayout />} />
						<Route path="register" element={<RegisterLayout />} />
						<Route path="forgot-password" element={<ForgotPasswordLayout />} />
						<Route path="my-orders" element={<OrdersLayout />} />
						<Route path="favorites" element={<FavoritesLayout />} />
						<Route path="settings" element={<SettingsLayout />} />
						<Route path="cart" element={<CartLayout />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
				</BrowserRouter>
			</ProductProvider>
		</UserProvider>
	);
}

export default App;
