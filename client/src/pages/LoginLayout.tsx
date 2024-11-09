import { Navigate } from 'react-router-dom';
import Login from '../components/Login';
import { useUser } from '../contexts/userContext';

function LoginLayout() {
	const { isAuthenticated } = useUser();

	if (isAuthenticated) {
		return <Navigate to="../" replace />;
	}

	return <Login />;
}

export default LoginLayout;
