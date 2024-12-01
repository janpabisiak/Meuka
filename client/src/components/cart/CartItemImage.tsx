interface Props {
	imagePath: string;
	alt: string;
}

function CartItemImage({ imagePath, alt }: Props) {
	return (
		<div className="cart__products__item__image">
			<img src={imagePath} alt={alt} />
		</div>
	);
}

export default CartItemImage;
