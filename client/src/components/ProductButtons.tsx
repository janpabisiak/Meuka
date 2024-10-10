function ProductButtons({ onAdd }: { onAdd: (where: 'cart' | 'favorites') => void }) {
	return (
		<div className="product__buttons">
			<button className="btn btn__primary" onClick={() => onAdd('cart')}>
				Add to cart
			</button>
			<button className="btn btn__secondary" onClick={() => onAdd('favorites')}>
				Save to favorites
			</button>
		</div>
	);
}

export default ProductButtons;
