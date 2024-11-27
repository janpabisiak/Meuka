import { Navigate, useParams } from 'react-router-dom';
import ProductsItem from '../components/product/ProductsItem';
import { useProduct } from '../contexts/productContext';

const validCategories = ['men', 'women', 'kids'];

function Category() {
	const { category } = useParams();
	const { products } = useProduct();

	if (category && !validCategories.includes(category)) return <Navigate to="../" replace />;

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

export default Category;
