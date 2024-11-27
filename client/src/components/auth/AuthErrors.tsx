import IError from '../../interfaces/IError';

interface Props {
	errors: IError;
}

function AuthErrors({ errors }: Props) {
	return (
		<>
			{errors && Object.keys(errors).length > 0 && (
				<ul className="auth__errors">
					{Object.keys(errors).map((key, i) => (
						<li className="auth__errors__item" key={i}>
							{errors[key]?.message}
						</li>
					))}
				</ul>
			)}
		</>
	);
}

export default AuthErrors;
