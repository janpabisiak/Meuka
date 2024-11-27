import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

function Navbar({ children }: Props) {
	return <nav className="navbar">{children}</nav>;
}

export default Navbar;
