function ProductButtons({ onAddToCart }: { onAddToCart: () => void }) {
	return (
		<div className="product__buttons">
			<button className="btn btn__primary" onClick={onAddToCart}>
				Add to cart
			</button>
			<button className="btn btn__secondary">Save to favorites</button>
		</div>
	);
}

export default ProductButtons;
