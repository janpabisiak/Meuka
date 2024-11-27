import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import AuthButtons from './AuthButtons';
import AuthErrors from './AuthErrors';
import sendRequest from '../../utils/sendRequest';
import { useUser } from '../../contexts/userContext';
import IError from '../../interfaces/IError';
import ILoginFormInputs from '../../interfaces/ILoginFormInputs';
import ILoginResponse from '../../interfaces/ILoginResponse';

function AuthLoginForm() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<ILoginFormInputs>();
	const navigate = useNavigate();
	const { dispatch } = useUser();

	async function onSubmit(data: ILoginFormInputs) {
		try {
			const { email, password } = data;
			const body = {
				email,
				password,
			};

			const response = await sendRequest<ILoginResponse>({ route: '/users/login', method: 'post', body });
			localStorage.setItem('token', response.data.token);
			dispatch({ type: 'user/set', payload: response.data.data });
			toast.success('Successfully logged in!');
			navigate('../');
		} catch (err) {
			if (err instanceof AxiosError && err.response) toast.error(err.response.data.message);
			else toast.error('An unexpected error occurred. Please try again later.');
		}
	}

	return (
		<form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="auth__title">Log in</h2>
			<AuthErrors errors={errors as IError} />
			<input
				className="input"
				type="email"
				placeholder="E-mail"
				{...register('email', {
					required: 'Email address is required',
					validate: {
						isValidEmail: (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email is not valid',
					},
				})}
			/>
			<input
				className="input"
				type="password"
				placeholder="Password"
				{...register('password', {
					required: 'Password is required',
				})}
			/>
			<AuthButtons
				buttons={[
					{
						text: 'Log in',
						type: 'submit',
					},
					{
						text: `Create an account`,
						type: 'button',
						isPrimary: false,
						route: '../register',
					},
				]}
			/>
		</form>
	);
}

export default AuthLoginForm;
