import ColorsList from './ColorsList';
import SizesList from './SizesList';
import ProductButtons from './ProductButtons';

function ProductDetails({ data }: { data: object }) {
	return (
		<div className="product__content">
			<h2 className="product__title">{data.title}</h2>
			<p className="product__description">{data.description}</p>
			<span className="product__price">{data.price} USD</span>
			{data.colors && <ColorsList colors={data.colors} />}
			{data.sizes && <SizesList sizes={data.sizes} />}
			<ProductButtons />
		</div>
	);
}

export default ProductDetails;
