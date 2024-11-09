import { NavLink } from 'react-router-dom';

function NavbarLink({ title }: { title: string }) {
	return (
		<li>
			<NavLink to={`${title === 'all' ? '..' : `../${title}`}`} className={`navbar__links__item`}>
				{title}
			</NavLink>
		</li>
	);
}

export default NavbarLink;
