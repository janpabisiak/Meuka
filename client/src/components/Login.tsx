function Login() {
	return (
		<main className="auth">
			<form className="auth__form">
				<h2 className="auth__title">Log in</h2>
				<input className="input" type="text" placeholder="Username" />
				<input className="input" type="password" placeholder="Password" />
				<div className="auth__btns">
					<input type="submit" className="btn btn__primary" value="Log in" />
					<button className="btn btn__secondary">Create account</button>
				</div>
			</form>
		</main>
	);
}

export default Login;
