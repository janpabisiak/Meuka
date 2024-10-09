import { ReactNode } from 'react';

function Navbar({ children }: { children: ReactNode }) {
	return <nav className="navbar">{children}</nav>;
}

export default Navbar;
