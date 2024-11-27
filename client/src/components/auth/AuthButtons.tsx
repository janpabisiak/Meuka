import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import IAuthButton from '../../interfaces/IAuthButton';

interface Props {
	buttons: IAuthButton[];
}

// Component to display authentication buttons
function AuthButtons({ buttons }: Props) {
	return (
		<div className="auth__btns">
			{buttons.map((btn, index) =>
				btn.route ? (
					<Link to={btn.route} key={index}>
						<Button text={btn.text} type={btn.type} isPrimary={btn.isPrimary ?? true} onClick={btn.onClick} />
					</Link>
				) : (
					<Button key={index} text={btn.text} type={btn.type} isPrimary={btn.isPrimary ?? true} onClick={btn.onClick} />
				)
			)}
		</div>
	);
}

export default AuthButtons;
