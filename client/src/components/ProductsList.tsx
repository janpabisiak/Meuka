import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/productContext';
import ProductsItem from './ProductsItem';

function ProductsList() {
	const { category } = useParams();
	const { products } = useProduct();

	const filteredProducts = category
		? [...products].filter((product) => product.category?.toLowerCase() === category?.toLowerCase())
		: products;

	if (products) {
		return (
			<main className="main">
				<div className="products">
					{filteredProducts.map((product) => (
						<ProductsItem key={product._id} product={product} />
					))}
				</div>
			</main>
		);
	}

	return <h1>No products available.</h1>;
}

export default ProductsList;
