import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<nav className="navbar">
			<ul className="navbar__links">
				<li>
					<Link to="/" className="navbar__links__item active">
						All
					</Link>
				</li>
				<li>
					<Link to="women" className="navbar__links__item">
						Women
					</Link>
				</li>
				<li>
					<Link to="men" className="navbar__links__item">
						Men
					</Link>
				</li>
				<li>
					<Link to="children" className="navbar__links__item">
						Children
					</Link>
				</li>
			</ul>
			<Link to="/" className="navbar__logo">
				Meuka
			</Link>
			<div className="navbar__details">
				<div className="user">
					<i className="las la-user user__icon"></i>
					<span className="user__name">lorem</span>
					<i className="las la-angle-down open-icon"></i>
					<div className="user__options">
						<ul>
							<li>Logout</li>
						</ul>
					</div>
				</div>
				<div className="shopping-cart">
					<i className="las la-shopping-cart shopping-cart__icon"></i>
					<span className="shopping-cart__amount">76</span>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
