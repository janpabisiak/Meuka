import NavbarLink from './NavbarLink';

const navbarLinks = ['all', 'women', 'men', 'kids'];

function NavbarLinks() {
	return (
		<ul className="navbar__links">
			{navbarLinks.map((title) => {
				return <NavbarLink key={title} title={title} />;
			})}
		</ul>
	);
}

export default NavbarLinks;
