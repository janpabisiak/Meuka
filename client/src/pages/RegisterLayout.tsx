import Header from '../components/Header';
import Register from '../components/Register';
import Footer from '../components/Footer';
import { UserProvider } from '../contexts/userContext';

function RegisterLayout() {
	return (
		<UserProvider>
			<Header />
			<Register />
			<Footer />
		</UserProvider>
	);
}

export default RegisterLayout;
