import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import { useUser } from '../../contexts/userContext';
import sendRequest from '../../utils/sendRequest';

function SettingsDetailsForm() {
	const { firstName, lastName, email, dispatch } = useUser();
	const { register, reset, handleSubmit } = useForm({
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
			const { firstName, lastName, email } = data;
			const body = {
				firstName,
				lastName,
				email,
			};

			await sendRequest({
				route: '/users',
				method: 'patch',
				token: localStorage.getItem('token')!,
				body,
			});
			toast.success('Data successfully updated');
			dispatch({ type: 'user/set', payload: [{ firstName, lastName, email }] });
		} catch (err) {
			toast.error(err.response.data.message);
		}
	}

	return (
		<form className="form" onSubmit={handleSubmit(onSubmitDetailsChange)}>
			<h3 className="form__title">Edit personal data</h3>
			<input className="input" type="text" placeholder="First name" {...register('firstName')} />
			<input className="input" type="text" placeholder="Last name" {...register('lastName')} />
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
			<Button text="Save changes" type="submit" />
		</form>
	);
}

export default SettingsDetailsForm;
