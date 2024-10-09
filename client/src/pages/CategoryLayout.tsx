import Header from '../components/Header';
import ProductsList from '../components/ProductsList';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NavbarLinks from '../components/NavbarLinks';
import Logo from '../components/Logo';
import NavbarDetails from '../components/NavbarDetails';
import NavbarCart from '../components/NavbarCart';
import NavbarUser from '../components/NavbarUser';
import CategoryTitle from '../components/CategoryTitle';

function CategoryLayout() {
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
			</Header>
			<ProductsList />
			<Footer />
		</>
	);
}

export default CategoryLayout;
