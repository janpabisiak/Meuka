import Header from '../components/Header';
import Login from '../components/Login';
import Footer from '../components/Footer';
import { UserProvider } from '../contexts/userContext';

function LoginLayout() {
	return (
		<UserProvider>
			<Header />
			<Login />
			<Footer />
		</UserProvider>
	);
}

export default LoginLayout;
