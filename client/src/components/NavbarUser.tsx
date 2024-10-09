import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';

function NavbarUser() {
	const [isOpen, setIsOpen] = useState(false);
	const {
		state: { firstName, isAuthenticated },
		handleLogout,
	} = useUser();

	if (!isAuthenticated) {
		return (
			<div className="user">
				<Link to="../login">
					<div className={`user__details`}>
						<i className="las la-user user__details__icon"></i>
						<span className="user__details__name">Login</span>
						<i className="las la-arrow-right open-icon"></i>
					</div>
				</Link>
			</div>
		);
	}

	if (isAuthenticated) {
		return (
			<div className="user">
				<div className={`user__details ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
					<i className="las la-user user__details__icon"></i>
					<span className="user__details__name">{firstName}</span>
					<i className="las la-angle-down open-icon"></i>
				</div>
				{isOpen && (
					<ul className="user__options">
						<Link to="../my-orders">
							<li className="user__options__item">My orders</li>
						</Link>
						<Link to="../favorites">
							<li className="user__options__item">Favorites</li>
						</Link>
						<Link to="../settings">
							<li className="user__options__item">Settings</li>
						</Link>
						<li className="user__options__item" onClick={() => handleLogout()}>
							Logout
						</li>
					</ul>
				)}
			</div>
		);
	}
}

export default NavbarUser;
