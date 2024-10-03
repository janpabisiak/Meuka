import ProductsItem from './ProductsItem';

function ProductsList() {
	return (
		<main className="main">
			<div className="products">
				<ProductsItem />
				<ProductsItem />
				<ProductsItem />
				<ProductsItem />
				<ProductsItem />
			</div>
		</main>
	);
}

export default ProductsList;
