interface Props {
	onDeleteItem: (id: number) => void;
	id: number;
	price: number;
}

function CartItemDetails({ onDeleteItem, id, price }: Props) {
	return (
		<div className="cart__products__item__details">
			<i className="las la-times cart__products__item__details__icon" onClick={() => onDeleteItem(id)}></i>
			<h5 className="cart__products__item__details__price">{price} $</h5>
		</div>
	);
}

export default CartItemDetails;
