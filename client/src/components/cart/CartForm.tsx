import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import { useUser } from '../../contexts/userContext';
import ICartFormInputs from '../../interfaces/ICartFormInputs';
import FormErrors from '../ui/FormErrors';
import IError from '../../interfaces/IError';
import ICartProduct from '../../interfaces/ICartProduct';
import sendRequest from '../../utils/sendRequest';

interface Props {
	selectedProducts: ICartProduct[];
	total: number;
}

function CartForm({ selectedProducts, total }: Props) {
	const {
		register,
		formState: { errors },
		setValue,
		handleSubmit,
	} = useForm<ICartFormInputs>();
	const navigate = useNavigate();
	const {
		state: { firstName, lastName, isAuthenticated },
		dispatch,
	} = useUser();

	async function onSubmit(data: ICartFormInputs) {
		try {
			const { firstName, lastName, address, city, country } = data;
			const body = {
				firstName,
				lastName,
				address,
				city,
				country,
				products: selectedProducts,
				total,
			};

			await sendRequest({ route: '/orders', method: 'post', token: String(localStorage.getItem('token')), body });
			dispatch({ type: 'cart/reset' });
			dispatch({ type: 'sync', payload: true });
			toast.success('Order successfully created.');
			navigate('../orders');
		} catch (err) {
			if (err instanceof AxiosError) toast.error(err.message);
			else toast.error('Failed to create order.');
		}
	}

	// Set form values if user is logged in
	useEffect(() => {
		if (firstName && lastName) {
			setValue('firstName', firstName);
			setValue('lastName', lastName);
		}
	}, [firstName, lastName, setValue]);

	if (isAuthenticated)
		return (
			<form className="form" onSubmit={handleSubmit(onSubmit)}>
				<h3 className="form__title">Edit delivery data</h3>
				<FormErrors errors={errors as IError} />
				<input
					className="input"
					type="text"
					placeholder="First name"
					{...register('firstName', { required: 'First name is required' })}
				/>
				<input
					className="input"
					type="text"
					placeholder="Last name"
					{...register('lastName', { required: 'Last name is required' })}
				/>
				<input className="input" type="text" placeholder="Address" {...register('address', { required: 'Address is required' })} />
				<input className="input" type="text" placeholder="City" {...register('city', { required: 'City is required' })} />
				<input className="input" type="text" placeholder="Country" {...register('country', { required: 'Country is required' })} />
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
