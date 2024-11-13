import ProductImage from '../components/ProductImage';
import ProductDetails from '../components/ProductDetails';
import ColorsList from '../components/ColorsList';
import SizesList from '../components/SizesList';
import ProductButtons from '../components/ProductButtons';
import ProductContent from '../components/ProductContent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProduct } from '../contexts/productContext';
import { useUser } from '../contexts/userContext';
import toast from 'react-hot-toast';
import ProductDeliveryInfo from '../components/ProductDeliveryInfo';

function Product() {
	const [selectedColor, setSelectedColor] = useState<string>('');
	const [selectedSize, setSelectedSize] = useState<string>('');
	const { id: productID } = useParams();
	const { products } = useProduct();
	const { dispatch } = useUser();
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

	function handleAdd(where: 'cart' | 'favorites') {
		dispatch({ type: `${where}/add`, payload: { _id: productID, selectedColor, selectedSize } });
		toast.success('Product added to cart');
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
						<ProductButtons onAdd={handleAdd} />
					</ProductDetails>
					<ProductDeliveryInfo />
				</>
			) : (
				<h1>No product found.</h1>
			)}
		</main>
	);
}

export default Product;
