import { Navigate } from 'react-router-dom';
import Register from '../components/Register';
import { useUser } from '../contexts/userContext';

function RegisterLayout() {
	const { isAuthenticated } = useUser();

	if (isAuthenticated) {
		return <Navigate to="../" replace />;
	}

	return <Register />;
}

export default RegisterLayout;
