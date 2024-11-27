import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

function NavbarUser() {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef();
	const [screenWidth, setScreenWidth] = useState(0);
	const { firstName, isAuthenticated, handleLogout } = useUser();

	useEffect(() => {
		setScreenWidth(screen.width);
	}, []);

	function handleCloseModal() {
		setIsOpen(false);
	}

	useEffect(() => {
		function handleClickOutside(e) {
			if (isOpen && ref.current && !ref.current.contains(e.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	if (screenWidth <= 768) return;

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
					<ul className="user__options" ref={ref}>
						<Link to="../orders" onClick={handleCloseModal}>
							<li className="user__options__item">My orders</li>
						</Link>
						<Link to="../settings" onClick={handleCloseModal}>
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
