import IError from '../../interfaces/IError';
interface Props {
	errors: IError;
}

// Component to display authentication errors
function FormErrors({ errors }: Props) {
	return (
		<>
			{errors && Object.keys(errors).length > 0 && (
				<ul className="errors">
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

export default FormErrors;
