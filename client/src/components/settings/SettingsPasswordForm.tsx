import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useUser } from '../../contexts/userContext';
import sendRequest from '../../utils/sendRequest';

function SettingsPasswordForm() {
	const { dispatch } = useUser();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();

	async function onSubmitPasswordChange(data) {
		try {
			const { currentPassword, newPassword } = data;

			const body = {
				currentPassword,
				newPassword,
			};

			await sendRequest({
				route: '/users/change-password',
				method: 'patch',
				token: localStorage.getItem('token')!,
				body,
			});

			dispatch({ type: 'user/logout' });
			toast.success('Password successfully changed.');
			navigate('../');
		} catch (err) {
			toast.error(err.response.data.message);
		}
	}

	return (
		<form className="form" onSubmit={handleSubmit(onSubmitPasswordChange)}>
			<h3 className="form__title">Change password</h3>
			<input
				className="input"
				type="password"
				placeholder="Current password"
				{...register('currentPassword', {
					required: 'Current password is required',
					minLength: { value: 8, message: "Current password can't be lower than 8 chars long" },
				})}
			/>
			<input
				className="input"
				type="password"
				placeholder="New password"
				{...register('newPassword', {
					required: 'New password is required',
					validate: {
						minLength: (value) => value.length >= 8 || 'Password should has more than 8 characters',
						isCapitalLetter: (value) => /[A-Z]/.test(value) || 'Password should has at least one capital letter',
						isLowerCaseLetter: (value) => /[a-z]/.test(value) || 'Password should has at least one lower case letter',
						isContainNumber: (value) => /\d/.test(value) || 'Password should has at least one number',
					},
				})}
			/>
			<Button text="Change password" type="submit" />
		</form>
	);
}

export default SettingsPasswordForm;
