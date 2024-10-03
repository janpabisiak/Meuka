import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductsList from '../components/ProductsList';

function AppLayout() {
	return (
		<>
			<Header>
				<Hero />
			</Header>
			<ProductsList />
		</>
	);
}

export default AppLayout;
