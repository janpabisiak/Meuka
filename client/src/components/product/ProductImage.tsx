import { useEffect, useRef } from 'react';

interface Props {
	image: string;
	title: string;
}

function ProductImage({ image, title }: Props) {
	const img = useRef<HTMLImageElement>(null);

	// Move the image on mouse move
	useEffect(() => {
		const imgElement = img.current;

		if (imgElement) {
			const handleMouseMove = (e: MouseEvent) => {
				const target = e.target as HTMLImageElement;
				target.style.setProperty('--x', (e.offsetX / target.offsetWidth) * 100 + '%');
				target.style.setProperty('--y', (e.offsetY / target.offsetHeight) * 100 + '%');
			};

			imgElement.addEventListener('mousemove', handleMouseMove);

			return () => {
				imgElement.removeEventListener('mousemove', handleMouseMove);
			};
		}
	}, []);

	return (
		<div className="product__image">
			<img src={image} ref={img} alt={title} loading="lazy" />
		</div>
	);
}

export default ProductImage;
