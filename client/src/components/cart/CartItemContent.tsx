interface Props {
	title: string;
	size: string;
	color: string;
}

function CartItemContent({ title, size, color }: Props) {
	return (
		<div className="cart__products__item__content">
			<h3 className="cart__products__item__content__title">{title}</h3>
			<span className="cart__products__item__content__details">
				{size} {color}
			</span>
		</div>
	);
}

export default CartItemContent;
