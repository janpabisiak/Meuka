function AuthVideo() {
	return (
		<div className="auth__video">
			<video autoPlay muted loop>
				<source src="./auth-video.webm" type="video/webm" />
			</video>
		</div>
	);
}

export default AuthVideo;
