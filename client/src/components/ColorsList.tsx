import Color from './Color';

function ColorsList({ colors }: { colors: string[] }) {
	return (
		<div className="product__colors">
			{colors.map((color) => (
				<Color key={color} bgColor={color} />
			))}
		</div>
	);
}

export default ColorsList;
