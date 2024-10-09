import { ReactNode } from 'react';

function NavbarDetails({ children }: { children: ReactNode }) {
	return <div className="navbar__details">{children}</div>;
}

export default NavbarDetails;
