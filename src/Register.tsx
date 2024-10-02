function Register() {
	return (
		<main className="auth">
			<form className="auth__form">
				<h2 className="auth__title">Create an account</h2>
				<div className="auth__siblings">
					<input className="input" type="text" placeholder="First name" />
					<input className="input" type="text" placeholder="Last name" />
				</div>
				<input className="input" type="text" placeholder="Username" />
				<input className="input" type="email" placeholder="E-mail" />
				<div className="auth__siblings">
					<input className="input" type="password" placeholder="Password" />
					<input className="input" type="password" placeholder="Confirm password" />
				</div>

				<div className="auth__btns">
					<input type="submit" className="btn btn__primary" value="Create account" />
					<button className="btn btn__secondary">I have account</button>
				</div>
			</form>
		</main>
	);
}

export default Register;
