function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<p className="footer__text">Copyright &copy; {currentYear} | Jan Pabisiak</p>
		</footer>
	);
}

export default Footer;
