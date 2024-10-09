import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';
import ColorsList from './ColorsList';
import SizesList from './SizesList';
import ProductButtons from './ProductButtons';
import ProductContent from './ProductContent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProduct } from '../contexts/productContext';

function Product() {
	const [selectedColor, setSelectedColor] = useState<string>('');
	const [selectedSize, setSelectedSize] = useState<string>('');
	const { id: productID } = useParams();
	const { products } = useProduct();
	const product = products.find((product) => product._id === productID);

	useEffect(() => {
		if (product) {
			setSelectedColor(product.colors[0]);
			setSelectedSize(product.sizes[0]);
		}
	}, [product]);

	function handleColorChange(color: string) {
		setSelectedColor(color);
	}

	function handleSizeChange(size: string) {
		setSelectedSize(size);
	}

	return (
		<main className="product">
			{/* {isLoading && <h1>Loading...</h1>}
			{error && <h1>Error: {error.message}</h1>} */}
			{product ? (
				<>
					<ProductImage image={product.images[0]} title={product.title} />
					<ProductDetails>
						<ProductContent title={product.title} description={product.description} price={product.price} />
						{product.colors && (
							<ColorsList colors={product.colors} selectedColor={selectedColor} onColorChange={handleColorChange} />
						)}
						{product.sizes && <SizesList sizes={product.sizes} selectedSize={selectedSize} onSizeChange={handleSizeChange} />}
						<ProductButtons />
					</ProductDetails>
				</>
			) : (
				<h1>No product found.</h1>
			)}
		</main>
	);
}

export default Product;
