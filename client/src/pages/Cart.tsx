import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useProduct } from '../contexts/productContext';
import { useUser } from '../contexts/userContext';
import { useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
	const { register, formState: errors, setValue, handleSubmit } = useForm();
	const navigate = useNavigate();
	const { firstName, lastName, cart, dispatch } = useUser();
	const { products } = useProduct();

	const productsCart = cart
		.map((product) => {
			const matchedItem = products.find((item) => item._id === product._id);
			if (matchedItem) {
				return {
					...matchedItem,
					selectedColor: product.selectedColor,
					selectedSize: product.selectedSize,
				};
			}
			return null;
		})
		.filter(Boolean);

	const total = useMemo(() => productsCart.reduce((acc, cur) => acc + cur.price, 0), [productsCart]);

	async function onSubmit(data) {
		try {
			await axios({
				url: 'http://localhost:3000/api/orders',
				method: 'post',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				data: {
					firstName: data.firstName,
					lastName: data.lastName,
					address: data.address,
					city: data.city,
					country: data.country,
					products: productsCart,
					total,
				},
			});
			dispatch({ type: 'cart/reset' });
			toast.success('Order successfully created.');
			navigate('../orders');
		} catch (err) {
			toast.error(err.message);
		}
	}

	function handleDeleteItem(id: number) {
		dispatch({ type: 'cart/delete', payload: id });
		toast.success('Item removed from the cart.');
	}

	useEffect(() => {
		if (firstName && lastName) {
			setValue('firstName', firstName);
			setValue('lastName', lastName);
		}
	}, [firstName, lastName, setValue]);

	return (
		<main className="cart">
			<form className="settings__form" onSubmit={handleSubmit(onSubmit)}>
				<h3 className="settings__form__title">Edit delivery data</h3>
				<input className="input" type="text" placeholder="First name" {...register('firstName')} />
				<input className="input" type="text" placeholder="Last name" {...register('lastName')} />
				<input className="input" type="text" placeholder="Address" {...register('address')} />
				<input className="input" type="text" placeholder="City" {...register('city')} />
				<input className="input" type="text" placeholder="Country" {...register('country')} />
				<button className="btn btn__primary" type="submit">
					Order
				</button>
			</form>
			<div className="cart__products">
				{productsCart.map((product, id) => {
					return (
						<div className="cart__products__item" key={id}>
							<div className="cart__products__item__image">
								<img src={product.images[0]} />
							</div>
							<div className="cart__products__item__content">
								<h3 className="cart__products__item__content__title">{product.title}</h3>
								<span className="cart__products__item__content__details">
									{product.selectedSize} {product.selectedColor}
								</span>
							</div>
							<div className="cart__products__item__details">
								<i className="las la-times cart__products__item__details__icon" onClick={() => handleDeleteItem(id)}></i>
								<h5 className="cart__products__item__details__price">{product.price} $</h5>
							</div>
						</div>
					);
				})}
				<h3 className="cart__products__total">
					Total: <span className="cart__products__amount">{total} $</span>
				</h3>
			</div>
		</main>
	);
}

export default Cart;
