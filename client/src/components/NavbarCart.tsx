import { Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

function NavbarCart() {
	const { cartLength } = useUser();

	return (
		<Link to="../cart">
			<div className="shopping-cart">
				<i className="las la-shopping-cart shopping-cart__icon"></i>
				<span className="shopping-cart__amount">{cartLength}</span>
			</div>
		</Link>
	);
}

export default NavbarCart;
