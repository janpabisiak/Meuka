import { Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/userContext';
import { useForm } from 'react-hook-form';

function Register() {
	const { isAuthenticated } = useUser();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const navigate = useNavigate();
	const { dispatch } = useUser();

	if (isAuthenticated) {
		return <Navigate to="../" replace />;
	}

	async function onSubmit(data) {
		try {
			if (data.password !== data.confirmPassword) {
				return;
			}

			const response = await axios.post('http://localhost:3000/api/users/register', {
				username: data.username,
				email: data.email,
				password: data.password,
				firstName: data.firstName,
				lastName: data.lastName,
			});

			localStorage.setItem('token', `Bearer ${response.data.token}`);
			dispatch({ type: 'user/set', payload: response.data.data });
			navigate('../');
		} catch (err) {
			const errorMessages = [];

			if (err.response?.data?.errors) {
				err.response.data.errors.forEach((error: any) => {
					errorMessages.push(error.msg);
				});
			} else if (err.response?.data?.error) {
				errorMessages.push(err.response.data.error);
			} else if (err.response?.message) {
				errorMessages.push(err.response.message);
			} else {
				errorMessages.push('An unexpected error occurred. Please try again.');
			}

			setErrors(errorMessages);
		}
	}

	return (
		<main className="auth">
			<div className="auth__video">
				<video autoPlay muted loop>
					<source src="./auth-video.webm" type="video/webm" />
				</video>
			</div>
			<form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
				<h2 className="auth__title">Create an account</h2>
				{Object.keys(errors).length > 0 && (
					<ul className="auth__errors">
						{Object.keys(errors).map((key, i) => {
							return (
								<li className="auth__errors__item" key={i}>
									{errors[key].message}
								</li>
							);
						})}
					</ul>
				)}
				<div className="auth__siblings">
					<input
						className="input"
						type="text"
						placeholder="First name"
						{...(register('firstName'), { required: 'First name is required' })}
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
					{...register('username', { required: 'Username is required' })}
				/>
				<input
					className="input"
					type="email"
					placeholder="E-mail"
					{...register('email', {
						required: 'Email address is required',
						validate: (input) => {
							const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
							return pattern.test(input) || 'Invalid email format';
						},
					})}
				/>
				<div className="auth__siblings">
					<input
						className="input"
						type="password"
						placeholder="Password"
						{...register('password', { required: 'Password is required' })}
					/>
					<input
						className="input"
						type="password"
						placeholder="Confirm password"
						{...register('confirmPassword', { required: 'Confirm password is required' })}
					/>
				</div>

				<div className="auth__btns">
					<button type="submit" className="btn btn__primary">
						Create account
					</button>
					<Link to="../login">
						<button className="btn btn__secondary">I have account</button>
					</Link>
				</div>
			</form>
		</main>
	);
}

export default Register;
