function ProductsItem() {
	return (
		<div className="products__item">
			<div className="products__item__image">
				<img
					className="default-image"
					src="https://static.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/7/4/7460Z-83X-003-1-881116.jpg"
				/>
				<img
					className="hover-image"
					src="https://static.reserved.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/7/4/7460Z-83X-001-1-881116.jpg"
				/>
			</div>
			<div className="products__item__details">
				<h2 className="products__item__title">Lorem ipsum</h2>
				<p className="products__item__price">4.99 USD</p>
			</div>
		</div>
	);
}

export default ProductsItem;
