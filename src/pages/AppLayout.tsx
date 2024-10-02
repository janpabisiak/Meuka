import Header from '../Header';
import Hero from '../Hero';
import ProductsList from '../ProductsList';

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
