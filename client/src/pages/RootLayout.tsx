import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/ui/Footer';
import Header from '../components/ui/Header';
import Hero from '../components/ui/Hero';
import Navbar from '../components/navbar/Navbar';
import NavbarLinks from '../components/navbar/NavbarLinks';
import Logo from '../components/ui/Logo';
import NavbarDetails from '../components/navbar/NavbarDetails';
import NavbarCart from '../components/navbar/NavbarCart';
import NavbarUser from '../components/navbar/NavbarUser';
import Loader from '../components/ui/Loader';
import { useUser } from '../contexts/userContext';
import { useProduct } from '../contexts/productContext';

function RootLayout() {
	const { isLoading: isLoadingUser } = useUser();
	const { isLoading: isLoadingItems } = useProduct();
	const { pathname } = useLocation();

	return (
		<>
			{(isLoadingUser || isLoadingItems) && <Loader />}
			{!isLoadingUser && !isLoadingItems && (
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
						{pathname === '/' && <Hero />}
					</Header>
					<Outlet />
					<Footer />
				</>
			)}
		</>
	);
}

export default RootLayout;
