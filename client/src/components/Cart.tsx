import { useProduct } from '../contexts/productContext';
import { useUser } from '../contexts/userContext';

function Cart() {
	const { cart, dispatch } = useUser();
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

	return (
		<main className="cart">
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
								<i
									className="las la-times cart__products__item__details__icon"
									onClick={() => dispatch({ type: 'cart/delete', payload: id })}
								></i>
								<h5 className="cart__products__item__details__price">{product.price} $</h5>
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
}

export default Cart;
