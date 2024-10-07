import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import ProductLayout from './pages/ProductLayout';
import LoginLayout from './pages/LoginLayout';
import RegisterLayout from './pages/RegisterLayout';
import Error404 from './pages/Error404';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<AppLayout />} />
				<Route path="product/:id" element={<ProductLayout />} />
				<Route path="login" element={<LoginLayout />} />
				<Route path="register" element={<RegisterLayout />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
