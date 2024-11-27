interface IButton {
	text: string;
	type?: 'submit' | 'reset' | 'button';
	isPrimary?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default IButton;
