import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';

function Product() {
	const { id: productID } = useParams();
	const { data, error, isLoading } = useFetch(import.meta.env.VITE_API_LINK + '/products/' + productID, 'GET');

	return (
		<main className="product">
			{isLoading && <h1>Loading...</h1>}
			{error && <h1>Error: {error.message}</h1>}
			{data && data.data ? (
				<>
					<ProductImage image={data.data.images[0]} title={data.data.title} />
					<ProductDetails data={data.data} />
				</>
			) : (
				<h1>No product found.</h1>
			)}
		</main>
	);
}

export default Product;
