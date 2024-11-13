import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useProduct } from '../contexts/productContext';
import { useUser } from '../contexts/userContext';
import { useEffect } from 'react';

function Cart() {
	const { register, formState: errors, setValue, handleSubmit } = useForm();
	const { firstName, lastName, cart, dispatch } = useUser();
	const { products } = useProduct();

	const productsCart = cart
		.map((product) => {
			return products.filter((item) => {
				if (item._id === product._id) {
					item.selectedColor = product.selectedColor;
					item.selectedSize = product.selectedSize;
					return item;
				}
			});
		})
		.flat();
	const total = productsCart.reduce((acc, cur) => acc + cur.price, 0);

	function onSubmit() {
		alert('Submitted');
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
				<input className="input" type="text" placeholder="Address" />
				<input className="input" type="text" placeholder="Postal code" />
				<input className="input" type="text" placeholder="City" />
				<input className="input" type="text" placeholder="Country" />
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
