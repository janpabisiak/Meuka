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

function RootLayout() {
	const { pathname } = useLocation();

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
				{pathname === '/' && <Hero />}
			</Header>
			<Outlet />
			<Footer />
		</>
	);
}

export default RootLayout;
