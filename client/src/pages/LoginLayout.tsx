import Header from '../components/Header';
import Login from '../components/Login';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NavbarLinks from '../components/NavbarLinks';
import Logo from '../components/Logo';
import NavbarDetails from '../components/NavbarDetails';
import NavbarCart from '../components/NavbarCart';
import NavbarUser from '../components/NavbarUser';
import { useUser } from '../contexts/userContext';
import { Navigate } from 'react-router-dom';

function LoginLayout() {
	const {
		state: { isAuthenticated },
	} = useUser();

	if (isAuthenticated) {
		return <Navigate to="../" replace />;
	}

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
			<Login />
			<Footer />
		</>
	);
}

export default LoginLayout;
