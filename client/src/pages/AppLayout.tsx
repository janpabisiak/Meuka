import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import NavbarLinks from '../components/NavbarLinks';
import Logo from '../components/Logo';
import NavbarDetails from '../components/NavbarDetails';
import NavbarCart from '../components/NavbarCart';
import NavbarUser from '../components/NavbarUser';
import ProductsList from '../components/ProductsList';

function AppLayout() {
	return (
		<>
			<Header>
				<Navbar>
					<NavbarLinks />
					<Logo />
					<NavbarDetails>
						<NavbarUser />
						<NavbarCart />
					</NavbarDetails>
				</Navbar>
				<Hero />
			</Header>
			<ProductsList />
			<Footer />
		</>
	);
}

export default AppLayout;
