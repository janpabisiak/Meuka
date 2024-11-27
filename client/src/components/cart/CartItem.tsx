import CartItemContent from './CartItemContent';
import CartItemDetails from './CartItemDetails';
import CartItemImage from './CartItemImage';
import ICartProduct from '../../interfaces/ICartProduct';

interface Props {
	product: ICartProduct;
	id: number;
	onDeleteItem: (id: number) => void;
}

function CartItem({ product, id, onDeleteItem }: Props) {
	return (
		<div className="cart__products__item">
			<CartItemImage imagePath={product.images[0]} />
			<CartItemContent title={product.title} size={product.selectedSize} color={product.selectedColor} />
			<CartItemDetails onDeleteItem={onDeleteItem} id={id} price={product.price} />
		</div>
	);
}

export default CartItem;
