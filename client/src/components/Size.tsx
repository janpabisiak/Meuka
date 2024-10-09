interface Props {
	size: string;
	selectedSize: string;
	onSizeChange: (size: string) => void;
}

function Size({ size, selectedSize, onSizeChange }: Props) {
	return (
		<div className={`product__sizes__item ${selectedSize === size ? 'active' : ''}`} onClick={() => onSizeChange(size)}>
			<span>{size}</span>
		</div>
	);
}

export default Size;
