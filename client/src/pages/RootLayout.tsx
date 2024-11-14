import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import NavbarLinks from '../components/NavbarLinks';
import Logo from '../components/Logo';
import NavbarDetails from '../components/NavbarDetails';
import NavbarCart from '../components/NavbarCart';
import NavbarUser from '../components/NavbarUser';
import { useUser } from '../contexts/userContext';
import { useProduct } from '../contexts/productContext';

function RootLayout() {
	const { isLoading: isLoadingUser } = useUser();
	const { isLoading: isLoadingItems } = useProduct();
	const { pathname } = useLocation();

	return (
		<>
			{(isLoadingUser || isLoadingItems) && (
				<div className="loader">
					<div className="loader__box" />
					<div className="loader__box" />
					<div className="loader__box" />
				</div>
			)}
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
