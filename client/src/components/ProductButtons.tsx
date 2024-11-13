function ProductButtons({ onAdd }: { onAdd: (where: 'cart' | 'favorites') => void }) {
	return (
		<div className="product__buttons">
			<button className="btn btn__primary" onClick={() => onAdd('cart')}>
				Add to cart
			</button>
		</div>
	);
}

export default ProductButtons;
