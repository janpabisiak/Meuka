import Color from './Color';

interface Props {
	colors: string[];
	selectedColor: string;
	onColorChange: (color: string) => void;
}

function ColorsList({ colors, selectedColor, onColorChange }: Props) {
	return (
		<div className="product__colors">
			{colors.map((color) => (
				<Color key={color} bgColor={color} selectedColor={selectedColor} onColorChange={onColorChange} />
			))}
		</div>
	);
}

export default ColorsList;
