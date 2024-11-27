import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

function useAuthVerify(authNeeded = true) {
	const { isAuthenticated } = useUser();
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
