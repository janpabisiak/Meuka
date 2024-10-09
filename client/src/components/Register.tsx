import axios from 'axios';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState<string[] | string | undefined>();
	const navigate = useNavigate();
	const { dispatch } = useUser();

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault();
			if (password !== confirmPassword) {
				return;
			}

			const response = await axios.post('http://localhost:3000/api/users/register', {
				username,
				email,
				password,
				firstName,
				lastName,
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
			<form className="auth__form" onSubmit={(e) => handleSubmit(e)}>
				<h2 className="auth__title">Create an account</h2>
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
				<div className="auth__siblings">
					<input
						className="input"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder="First name"
					/>
					<input
						className="input"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder="Last name"
					/>
				</div>
				<input
					className="input"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
				<div className="auth__siblings">
					<input
						className="input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
					<input
						className="input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder="Confirm password"
					/>
				</div>

				<div className="auth__btns">
					<input type="submit" className="btn btn__primary" value="Create account" />
					<Link to="../login">
						<button className="btn btn__secondary">I have account</button>
					</Link>
				</div>
			</form>
		</main>
	);
}

export default Register;
