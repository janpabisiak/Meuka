import { Link } from 'react-router-dom';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import Button from '../ui/Button';
import { useUser } from '../../contexts/userContext';
import ICartFormInputs from '../../interfaces/ICartFormInputs';

function CartForm({
	register,
	handleSubmit,
	onSubmit,
}: {
	register: UseFormRegister<ICartFormInputs>;
	handleSubmit: UseFormHandleSubmit<ICartFormInputs>;
	onSubmit: (data: ICartFormInputs) => void;
}) {
	const {
		state: { isAuthenticated },
		dispatch,
	} = useUser();

	if (isAuthenticated)
		return (
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<h3 className="form__title">Edit delivery data</h3>
				<input className="input" type="text" placeholder="First name" {...register('firstName', { required: true })} />
				<input className="input" type="text" placeholder="Last name" {...register('lastName', { required: true })} />
				<input className="input" type="text" placeholder="Address" {...register('address', { required: true })} />
				<input className="input" type="text" placeholder="City" {...register('city', { required: true })} />
				<input className="input" type="text" placeholder="Country" {...register('country', { required: true })} />
				<Button text="Order" type="submit" />
				<Button text="Clear cart" isPrimary={false} onClick={() => dispatch({ type: 'cart/reset' })} />
			</form>
		);

	if (!isAuthenticated) {
		return (
			<form className="form">
				<h3 className="form__title">You have to log in to edit personal details.</h3>
				<Link to="../login">
					<Button text="Log in" />
				</Link>
				<Button text="Clear cart" isPrimary={false} onClick={() => dispatch({ type: 'cart/reset' })} />
			</form>
		);
	}
}

export default CartForm;
