import Size from './Size';

function SizesList({ sizes }: { sizes: string[] }) {
	return (
		<div className="product__sizes">
			{sizes.map((size) => (
				<Size key={size} size={size} />
			))}
		</div>
	);
}

export default SizesList;
