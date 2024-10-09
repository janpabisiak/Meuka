import { useParams } from 'react-router-dom';
import NavbarLink from './NavbarLink';

const navbarLinks = ['all', 'women', 'men', 'kids'];

function NavbarLinks() {
	let { category } = useParams();

	return (
		<ul className="navbar__links">
			{navbarLinks.map((title) => {
				return <NavbarLink key={title} title={title} activeTitle={category} />;
			})}
		</ul>
	);
}

export default NavbarLinks;
