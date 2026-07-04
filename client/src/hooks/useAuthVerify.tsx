import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

function useAuthVerify(authNeeded = true) {
	const {
		state: { isAuthenticated, isLoading },
	} = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) return;

		if (!authNeeded && isAuthenticated) {
			navigate('../', { replace: true });
		}

		if (authNeeded && !isAuthenticated) {
			navigate('../login', { replace: true });
		}
	}, [authNeeded, isLoading, isAuthenticated, navigate]);
}

export default useAuthVerify;
