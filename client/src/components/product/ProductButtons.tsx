import Button from '../ui/Button';

interface Props {
	onAdd: (where: 'cart' | 'favorites') => void;
}

function ProductButtons({ onAdd }: Props) {
	return (
		<div className="product__buttons">
			<Button text="Add to cart" onClick={() => onAdd('cart')} />
		</div>
	);
}

export default ProductButtons;
