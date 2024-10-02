import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import ProductLayout from './pages/ProductLayout';
import LoginLayout from './pages/LoginLayout';
import RegisterLayout from './pages/RegisterLayout';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<AppLayout />}></Route>
				<Route path="product" element={<ProductLayout />}></Route>
				<Route path="login" element={<LoginLayout />}></Route>
				<Route path="register" element={<RegisterLayout />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
