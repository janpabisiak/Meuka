import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProductImage from '../components/product/ProductImage';
import ProductDetails from '../components/product/ProductDetails';
import ColorsList from '../components/product/ColorsList';
import SizesList from '../components/product/SizesList';
import ProductButtons from '../components/product/ProductButtons';
import ProductContent from '../components/product/ProductContent';
import ProductDeliveryInfo from '../components/product/ProductDeliveryInfo';
import { useProduct } from '../contexts/productContext';
import { useUser } from '../contexts/userContext';

function Product() {
	const [selectedColor, setSelectedColor] = useState<string>('');
	const [selectedSize, setSelectedSize] = useState<string>('');
	const { id: productID } = useParams();
	const { products } = useProduct();
	const { dispatch } = useUser();
	const product = products.find((product) => product._id === productID);

	// Scroll to top on mount
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Set default color and size
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
