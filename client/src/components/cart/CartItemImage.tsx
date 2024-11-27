interface Props {
	imagePath: string;
}

function CartItemImage({ imagePath }: Props) {
	return (
		<div className="cart__products__item__image">
			<img src={imagePath} />
		</div>
	);
}

export default CartItemImage;
