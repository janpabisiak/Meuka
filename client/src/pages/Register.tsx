import AuthVideo from '../components/auth/AuthVideo';
import AuthRegisterForm from '../components/auth/AuthRegisterForm';
import useAuthVerify from '../hooks/useAuthVerify';

function Register() {
	useAuthVerify(false);

	return (
		<main className="auth">
			<AuthVideo />
			<AuthRegisterForm />
		</main>
	);
}

export default Register;
