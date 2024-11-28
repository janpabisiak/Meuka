import { useMemo } from 'react';
import CartList from '../components/cart/CartList';
import CartForm from '../components/cart/CartForm';
import { useUser } from '../contexts/userContext';
import { useProduct } from '../contexts/productContext';

function Cart() {
	const {
		state: { cart },
	} = useUser();
	const {
		state: { products },
	} = useProduct();

	// Get products from cart
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
		.filter((product): product is NonNullable<typeof product> => product !== null);

	// Calculate total price of cart
	const total = useMemo(() => parseFloat(selectedProducts.reduce((acc, cur) => acc + cur!.price, 0).toFixed(2)), [selectedProducts]);

	return (
		<main className="cart">
			<CartForm selectedProducts={selectedProducts} total={total} />
			<CartList selectedProducts={selectedProducts} total={total} />
		</main>
	);
}

export default Cart;
