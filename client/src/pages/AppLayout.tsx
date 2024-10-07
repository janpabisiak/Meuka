import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductsList from '../components/ProductsList';
import { UserProvider } from '../contexts/userContext';

function AppLayout() {
	return (
		<UserProvider>
			<Header>
				<Hero />
			</Header>
			<ProductsList />
		</UserProvider>
	);
}

export default AppLayout;
