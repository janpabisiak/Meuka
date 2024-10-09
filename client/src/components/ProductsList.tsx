import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/productContext';
import ProductsItem from './ProductsItem';
import { useEffect, useState } from 'react';

function ProductsList() {
	const { category } = useParams();
	const { products } = useProduct();

	// if (isLoading) {
	// 	return <h1>Loading...</h1>;
	// }

	// if (error) {
	// 	return <h1>Error: {error.message}</h1>;
	// }

	if (products) {
		return (
			<main className="main">
				<div className="products">
					{products.map((product) => (
						<ProductsItem key={product._id} product={product} />
					))}
				</div>
			</main>
		);
	}

	return <h1>No products available.</h1>;
}

export default ProductsList;
