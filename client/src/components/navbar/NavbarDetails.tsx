import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

function NavbarDetails({ children }: Props) {
	return <div className="navbar__details">{children}</div>;
}

export default NavbarDetails;
