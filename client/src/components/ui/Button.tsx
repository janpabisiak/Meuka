import IButton from '../../interfaces/IButton';

function Button({ text, type = 'button', isPrimary = true, onClick }: IButton) {
	return (
		<button type={type} className={`btn ${isPrimary ? 'btn__primary' : 'btn__secondary'}`} onClick={onClick}>
			{text}
		</button>
	);
}

export default Button;
