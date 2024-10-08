import useFetch from '../hooks/useFetch';
import ProductsItem from './ProductsItem';

function ProductsList() {
	const { data, error, isLoading } = useFetch(import.meta.env.VITE_API_LINK + '/products', 'GET');

	console.log(data);

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
						<ProductsItem key={product._id} product={product} />
					))}
				</div>
			</main>
		);
	}

	return <h1>No products available.</h1>;
}

export default ProductsList;
