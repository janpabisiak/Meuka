import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import sendRequest from '../../utils/sendRequest';
import { useUser } from '../../contexts/userContext';
import IError from '../../interfaces/IError';
import IRegisterFormInputs from '../../interfaces/IRegisterFormInputs';
import IRegisterResponse from '../../interfaces/IRegisterResponse';
import FormErrors from '../ui/FormErrors';

function AuthRegisterForm() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<IRegisterFormInputs>();
	const navigate = useNavigate();
	const { dispatch } = useUser();

	async function onSubmit(data: IRegisterFormInputs) {
		try {
			if (data.password !== data.confirmPassword) {
				return;
			}

			const { username, email, password, firstName, lastName } = data;
			const body = {
				username,
				email,
				password,
				firstName,
				lastName,
			};

			const response = await sendRequest<IRegisterResponse>({
				route: '/users/register',
				method: 'post',
				body,
			});

			localStorage.setItem('token', response.data.token);
			dispatch({ type: 'user/set', payload: response.data.data });
			navigate('../login');
		} catch (err) {
			if (err instanceof AxiosError && err.response) toast.error(err.response.data.message);
			else toast.error('An unexpected error occurred. Please try again later.');
		}
	}

	return (
		<form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
			<h2 className="auth__title">Create an account</h2>
			<FormErrors errors={errors as IError} />
			<div className="auth__siblings">
				<input
					className="input"
					type="text"
					placeholder="First name"
					{...register('firstName', { required: 'First name is required' })}
				/>
				<input
					className="input"
					type="text"
					placeholder="Last name"
					{...register('lastName', { required: 'Last name is required' })}
				/>
			</div>
			<input
				className="input"
				type="text"
				placeholder="Username"
				{...register('username', {
					required: 'Username is required',
					minLength: { value: 6, message: 'Username should be at least 6 chars long.' },
				})}
			/>
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
			<div className="auth__siblings">
				<input
					className="input"
					type="password"
					placeholder="Password"
					{...register('password', {
						required: 'Password is required',
						validate: {
							minLength: (value) => value.length >= 8 || 'Password should has more than 8 characters',
							isCapitalLetter: (value) => /[A-Z]/.test(value) || 'Password should has at least one capital letter',
							isLowerCaseLetter: (value) => /[a-z]/.test(value) || 'Password should has at least one lower case letter',
							isContainNumber: (value) => /\d/.test(value) || 'Password should has at least one number',
						},
					})}
				/>
				<input
					className="input"
					type="password"
					placeholder="Confirm password"
					{...register('confirmPassword', { required: 'Confirm password is required' })}
				/>
			</div>
			<AuthButtons
				buttons={[
					{
						text: 'Create an account',
						type: 'submit',
					},
					{
						text: `I have an account`,
						type: 'button',
						isPrimary: false,
						route: '../login',
					},
				]}
			/>
		</form>
	);
}

export default AuthRegisterForm;
