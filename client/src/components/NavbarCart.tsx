import { Link } from 'react-router-dom';

function NavbarCart() {
	return (
		<Link to="../cart">
			<div className="shopping-cart">
				<i className="las la-shopping-cart shopping-cart__icon"></i>
				<span className="shopping-cart__amount">76</span>
			</div>
		</Link>
	);
}

export default NavbarCart;
