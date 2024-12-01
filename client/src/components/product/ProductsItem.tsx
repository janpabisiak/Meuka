import { Link } from 'react-router-dom';
import IProduct from '../../interfaces/IProduct';

interface Props {
	product: IProduct;
}

function ProductsItem({ product }: Props) {
	const productLink = `product/` + product._id;

	return (
		<Link to={`../${productLink}`}>
			<div className="products__item">
				<div className="products__item__image">
					<img className="default-image" src={product.images[0]} alt={product.description} />
					<img className="hover-image" src={product.images[1]} alt={product.description} />
				</div>
				<div className="products__item__details">
					<h2 className="products__item__title">{product.title}</h2>
					<p className="products__item__price">{product.price} USD</p>
				</div>
			</div>
		</Link>
	);
}

export default ProductsItem;
