import AuthVideo from '../components/auth/AuthVideo';
import AuthForm from '../components/auth/AuthLoginForm';
import useAuthVerify from '../hooks/useAuthVerify';

function Login() {
	useAuthVerify(false);

	return (
		<main className="auth">
			<AuthVideo />
			<AuthForm />
		</main>
	);
}

export default Login;
