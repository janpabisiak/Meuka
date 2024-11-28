import { useState } from 'react';
import NavbarLink from './NavbarLink';
import { useUser } from '../../contexts/userContext';
import useWindowResize from '../../hooks/useWindowResize';

const navbarLinks = ['all', 'women', 'men', 'kids'];
const navbarLinksMobileAll = ['orders', 'settings', 'logout'];

function NavbarLinks() {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);
	const isDesktopView = useWindowResize();

	const {
		state: { isAuthenticated },
	} = useUser();

	if (isDesktopView) {
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
