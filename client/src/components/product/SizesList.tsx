import Size from './Size';

interface Props {
	sizes: string[];
	selectedSize: string;
	onSizeChange: (size: string) => void;
}

function SizesList({ sizes, selectedSize, onSizeChange }: Props) {
	return (
		<div className="product__sizes">
			{sizes.map((size) => (
				<Size key={size} size={size} selectedSize={selectedSize} onSizeChange={onSizeChange} />
			))}
		</div>
	);
}

export default SizesList;
