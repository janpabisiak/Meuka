import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/userContext';
import toast from 'react-hot-toast';

function Login() {
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
			const response = await axios.post('http://localhost:3000/api/users/login', {
				email: data.email,
				password: data.password,
			});
			localStorage.setItem('token', response.data.token);
			dispatch({ type: 'user/set', payload: response.data.data });
			toast.success('Successfully logged in!');
			navigate('../');
		} catch (err) {
			// TODO: ADD ERRORS FROM SERVER
			toast.error(err.response.data.message);
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
				<h2 className="auth__title">Log in</h2>
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
				<input
					className="input"
					type="password"
					placeholder="Password"
					{...register('password', {
						required: 'Password is required',
					})}
				/>
				<div className="auth__btns">
					<button type="submit" className="btn btn__primary">
						Log in
					</button>
					<Link to="../register">
						<button className="btn btn__secondary">Create account</button>
					</Link>
				</div>
			</form>
		</main>
	);
}

export default Login;
