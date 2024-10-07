import Header from '../components/Header';
import Product from '../components/Product';
import Footer from '../components/Footer';
import { UserProvider } from '../contexts/userContext';

function ProductLayout() {
	return (
		<UserProvider>
			<Header />
			<Product />
			<Footer />
		</UserProvider>
	);
}

export default ProductLayout;
