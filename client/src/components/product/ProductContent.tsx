interface Props {
	title: string;
	description: string;
	price: number;
}

function ProductContent({ title, description, price }: Props) {
	return (
		<>
			<h2 className="product__title">{title}</h2>
			<p className="product__description">{description}</p>
			<span className="product__price">{price} USD</span>
		</>
	);
}

export default ProductContent;
