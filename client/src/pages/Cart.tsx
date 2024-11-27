import toast from 'react-hot-toast';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CartList from '../components/cart/CartList';
import CartForm from '../components/cart/CartForm';
import sendRequest from '../utils/sendRequest';
import { useUser } from '../contexts/userContext';
import { useProduct } from '../contexts/productContext';

function Cart() {
	const { register, setValue, handleSubmit } = useForm();
	const navigate = useNavigate();
	const { firstName, lastName, cart, dispatch } = useUser();
	const { products } = useProduct();

	const selectedProducts = cart
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

	const total = useMemo(() => selectedProducts.reduce((acc, cur) => acc + cur.price, 0).toFixed(2), [selectedProducts]);

	async function onSubmit(data) {
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
			toast.success('Order successfully created.');
			navigate('../');
		} catch (err) {
			toast.error(err.message);
		}
	}

	useEffect(() => {
		if (firstName && lastName) {
			setValue('firstName', firstName);
			setValue('lastName', lastName);
		}
	}, [firstName, lastName, setValue]);

	return (
		<main className="cart">
			<CartForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} />
			<CartList selectedProducts={selectedProducts} total={total} />
		</main>
	);
}

export default Cart;
