import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

function NavbarCart() {
	const {
		state: { cart },
	} = useUser();

	return (
		<Link to="../cart">
			<div className="shopping-cart">
				<i className="las la-shopping-cart shopping-cart__icon"></i>
				<span className="shopping-cart__amount">{cart.length}</span>
			</div>
		</Link>
	);
}

export default NavbarCart;
