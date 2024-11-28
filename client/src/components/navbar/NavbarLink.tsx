import { NavLink } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

interface Props {
	title?: string;
	onClick?: () => void;
}

function NavbarLink({ title }: Props) {
	const { handleLogout } = useUser();

	if (title === 'logout')
		return (
			<li className={`navbar__links__item`} onClick={handleLogout}>
				{title}
			</li>
		);
	return (
		<li>
			<NavLink to={`${title === 'all' ? '..' : `../${title?.replace(' ', '-')}`}`} className={`navbar__links__item`}>
				{title}
			</NavLink>
		</li>
	);
}

export default NavbarLink;
