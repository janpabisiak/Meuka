import { Link } from 'react-router-dom';

function NavbarLink({ title, activeTitle = 'all' }: { title: string; activeTitle?: string }) {
	return (
		<li>
			<Link
				to={`${title === 'all' ? '..' : `../${title}`}`}
				className={`navbar__links__item ${title === activeTitle ? 'active' : ''}`}
			>
				{title}
			</Link>
		</li>
	);
}

export default NavbarLink;
