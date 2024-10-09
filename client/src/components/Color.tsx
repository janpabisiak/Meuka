interface Props {
	bgColor: string;
	selectedColor: string;
	onColorChange: (color: string) => void;
}

function Color({ bgColor, selectedColor, onColorChange }: Props) {
	return (
		<div
			className={`product__colors__item ${selectedColor === bgColor ? 'active' : ''}`}
			onClick={() => onColorChange(bgColor)}
			style={{ backgroundColor: bgColor }}
		></div>
	);
}

export default Color;
