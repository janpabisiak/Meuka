function Navbar() {
	return (
		<nav className="navbar">
			<ul className="navbar__links">
				<li>
					<a href="http://" className="navbar__links__item active">
						All
					</a>
				</li>
				<li>
					<a href="http://" className="navbar__links__item">
						Women
					</a>
				</li>
				<li>
					<a href="http://" className="navbar__links__item">
						Men
					</a>
				</li>
				<li>
					<a href="http://" className="navbar__links__item">
						Children
					</a>
				</li>
			</ul>
			<a href="" className="navbar__logo">
				Meuka
			</a>
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
