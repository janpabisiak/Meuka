import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Register from '../components/Register';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NavbarLinks from '../components/NavbarLinks';
import Logo from '../components/Logo';
import NavbarDetails from '../components/NavbarDetails';
import NavbarCart from '../components/NavbarCart';
import NavbarUser from '../components/NavbarUser';
import { useUser } from '../contexts/userContext';

function RegisterLayout() {
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
			<Register />
			<Footer />
		</>
	);
}

export default RegisterLayout;
