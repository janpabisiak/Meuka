import useFetch from '../hooks/useFetch';
import ProductsItem from './ProductsItem';

function ProductsList() {
	const { data, error, isLoading } = useFetch('http://localhost:3000/api/products/', 'GET');

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>Error: {error.message}</h1>;
	}

	if (data && data.data) {
		return (
			<main className="main">
				<div className="products">
					{data.data.map((product) => (
						<ProductsItem key={product.id} product={product} />
					))}
				</div>
			</main>
		);
	}

	return <h1>No products available.</h1>;
}

export default ProductsList;
