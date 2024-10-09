import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/userContext';
import { Link } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<string[] | string | undefined>();
	const navigate = useNavigate();
	const { dispatch } = useUser();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			const response = await axios.post('http://localhost:3000/api/users/login', {
				email,
				password,
			});
			localStorage.setItem('token', response.data.token);
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
			} else {
				errorMessages.push('An unexpected error occurred. Please try again.');
			}

			setErrors(errorMessages);
		}
	}

	return (
		<main className="auth">
			<form className="auth__form" onSubmit={(e) => handleSubmit(e)}>
				<h2 className="auth__title">Log in</h2>
				{errors && (
					<ul className="auth__errors">
						{errors.map((error, i) => {
							return (
								<li className="auth__errors__item" key={i}>
									{error}
								</li>
							);
						})}
					</ul>
				)}
				<input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
				<input
					className="input"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<div className="auth__btns">
					<input type="submit" className="btn btn__primary" value="Log in" />
					<Link to="../register">
						<button className="btn btn__secondary">Create account</button>
					</Link>
				</div>
			</form>
		</main>
	);
}

export default Login;
