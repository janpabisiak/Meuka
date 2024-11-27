import { useEffect, useState } from 'react';
import NavbarLink from './NavbarLink';
import { useUser } from '../../contexts/userContext';

const navbarLinks = ['all', 'women', 'men', 'kids'];
const navbarLinksMobileAll = ['orders', 'settings', 'logout'];

function NavbarLinks() {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);
	const [screenWidth, setScreenWidth] = useState(0);
	const { isAuthenticated } = useUser();

	useEffect(() => {
		setScreenWidth(screen.width);
	}, []);

	if (screenWidth > 768) {
		return (
			<ul className="navbar__links">
				{navbarLinks.map((title) => (
					<NavbarLink key={title} title={title} />
				))}
			</ul>
		);
	}

	return (
		<>
			{!isNavbarOpen && (
				<ul className="navbar__links">
					<li className="navbar__links__item active" onClick={() => setIsNavbarOpen(true)}>
						Menu
					</li>
				</ul>
			)}
			{isNavbarOpen && (
				<div className="navbar__links__mobile">
					<i className="las la-times icon" onClick={() => setIsNavbarOpen(false)}></i>
					<h1 className="logo">Meuka</h1>
					<ul className="navbar__links">
						{navbarLinks.map((title) => (
							<NavbarLink key={title} title={title} />
						))}
						{isAuthenticated ? (
							navbarLinksMobileAll.map((title) => <NavbarLink key={title} title={title} />)
						) : (
							<NavbarLink key="login" title="Login" />
						)}
					</ul>
				</div>
			)}
		</>
	);
}

export default NavbarLinks;
