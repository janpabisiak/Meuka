import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

// Hook to verify if user is authenticated
function useAuthVerify(authNeeded = true) {
	const {
		state: { isAuthenticated },
	} = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!authNeeded && isAuthenticated) {
			navigate('../', { replace: true });
		}

		if (authNeeded && !isAuthenticated) {
			navigate('../login', { replace: true });
		}
	}, [authNeeded, isAuthenticated, navigate]);
}

export default useAuthVerify;
