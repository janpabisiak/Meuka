import Navbar from './Navbar';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';

interface HeaderProps {
	children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}

export default Header;
