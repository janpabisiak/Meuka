import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import Button from '../ui/Button';
import { useUser } from '../../contexts/userContext';
import sendRequest from '../../utils/sendRequest';
import ISettingsDetailsFormInputs from '../../interfaces/ISettingsDetailsFormInputs';
import IError from '../../interfaces/IError';
import FormErrors from '../ui/FormErrors';

function SettingsDetailsForm() {
	const {
		state: { firstName, lastName, email },
		dispatch,
	} = useUser();
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<ISettingsDetailsFormInputs>({
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

	async function onSubmitDetailsChange(data: ISettingsDetailsFormInputs) {
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
			dispatch({ type: 'sync', payload: true });
		} catch (err) {
			if (err instanceof AxiosError && err.response) toast.error(err.response.data.message);
			else toast.error('Failed to update data');
		}
	}

	return (
		<form className="form" onSubmit={handleSubmit(onSubmitDetailsChange)}>
			<h3 className="form__title">Edit personal data</h3>
			<FormErrors errors={errors as IError} />
			<input
				className="input"
				type="text"
				placeholder="First name"
				{...register('firstName', { required: 'First name is required' })}
			/>
			<input className="input" type="text" placeholder="Last name" {...register('lastName', { required: 'Last name is required' })} />
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
