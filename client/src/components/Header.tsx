import Navbar from './Navbar';

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
