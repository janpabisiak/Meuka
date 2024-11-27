import { NavLink } from 'react-router-dom';

interface Props {
	title: string;
}

function NavbarLink({ title }: Props) {
	return (
		<li>
			<NavLink to={`${title === 'all' ? '..' : `../${title.replace(' ', '-')}`}`} className={`navbar__links__item`}>
				{title}
			</NavLink>
		</li>
	);
}

export default NavbarLink;
