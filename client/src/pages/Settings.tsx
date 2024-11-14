import { useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Settings() {
	const navigate = useNavigate();
	const { firstName, lastName, email, dispatch } = useUser();
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm({
		defaultValues: {
			firstName,
			lastName,
			email,
		},
	});

	useEffect(() => {
		if (firstName && lastName && email) {
			reset({
				firstName,
				lastName,
				email,
			});
		}
	}, [firstName, lastName, email, reset]);

	async function onSubmitDetailsChange(data) {
		try {
			await axios({
				url: 'http://localhost:3000/api/users/',
				method: 'patch',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				data: {
					firstName,
					lastName,
					email,
				},
			});
		} catch (err) {
			console.log(err);
		}
	}

	async function onSubmitPasswordChange(data) {
		try {
			await axios({
				url: 'http://localhost:3000/api/users/change-password',
				method: 'patch',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				data: {
					currentPassword: data.currentPassword,
					newPassword: data.newPassword,
				},
			});

			dispatch({ type: 'user/logout' });
			toast.success('Password successfully changed.');
			navigate('../');
		} catch (err) {
			toast.error(err.response.data.message);
		}
	}

	return (
		<main className="settings">
			<form className="settings__form" onSubmit={handleSubmit(onSubmitDetailsChange)}>
				<h3 className="settings__form__title">Edit personal data</h3>
				<input className="input" type="text" placeholder="First name" {...register('firstName')} />
				<input className="input" type="text" placeholder="Last name" {...register('lastName')} />
				<input className="input" type="email" placeholder="E-mail" {...register('email')} />
				<button className="btn btn__primary" type="submit">
					Save changes
				</button>
			</form>

			<form className="settings__form" onSubmit={handleSubmit(onSubmitPasswordChange)}>
				<h3 className="settings__form__title">Change password</h3>
				<input
					className="input"
					type="password"
					placeholder="Current password"
					{...register('currentPassword', { minLength: 8 })}
				/>
				<input className="input" type="password" placeholder="New password" {...(register('newPassword'), { required: true })} />
				<button className="btn btn__primary" type="submit">
					Change password
				</button>
			</form>
		</main>
	);
}

export default Settings;
