import { useEffect } from 'react';
import { useUser } from '../contexts/userContext';
import { useForm } from 'react-hook-form';

function Settings() {
	const { firstName, lastName, username, email } = useUser();
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm({
		defaultValues: {
			firstName,
			lastName,
			username,
			email,
		},
	});

	useEffect(() => {
		if (firstName && lastName && username && email) {
			reset({
				firstName,
				lastName,
				username,
				email,
			});
		}
	}, [firstName, lastName, username, email, reset]);

	return (
		<main className="settings">
			<form className="settings__form">
				<h3 className="settings__form__title">Edit personal data</h3>
				<input className="input" type="text" placeholder="First name" {...register('firstName')} />
				<input className="input" type="text" placeholder="Last name" {...register('lastName')} />
				<input className="input" type="text" placeholder="Username" {...register('username')} />
				<input className="input" type="email" placeholder="E-mail" {...register('email')} />
				<button className="btn btn__primary" type="submit">
					Save changes
				</button>
			</form>

			<form className="settings__form">
				<h3 className="settings__form__title">Change password</h3>
				<input className="input" type="password" placeholder="Current password" {...register('currentPassword')} />
				<input className="input" type="password" placeholder="New password" {...register('newPassword')} />
				<button className="btn btn__primary" type="submit">
					Save changes
				</button>
			</form>
		</main>
	);
}

export default Settings;
