import { useEffect, useRef } from 'react';

function Product() {
	const img = useRef<HTMLImageElement>(null);

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
				imgElement.removeEventListener('mousedown', handleMouseMove);
			};
		}
	}, []);

	return (
		<>
			<main className="product">
				<div className="product__image">
					<img src="https://static.sinsay.com/media/catalog/product/7/9/7945Y-05J-001-1-794183.jpg" ref={img} />
				</div>
				<div className="product__content">
					<h2 className="product__title">Lorem ipsum dolor sit</h2>
					<span className="product__price">4.99 USD</span>
					<p className="product__description">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae distinctio ab facere quis omnis. Deleniti ipsam
						laborum itaque facere! Blanditiis inventore dolorem cum modi alias odio nostrum deleniti porro quod?
					</p>
					<div className="product__colors">
						<div className="product__colors__item"></div>
						<div className="product__colors__item active"></div>
						<div className="product__colors__item"></div>
						<div className="product__colors__item"></div>
					</div>
					<div className="product__sizes">
						<div className="product__sizes__item">28</div>
						<div className="product__sizes__item">30</div>
						<div className="product__sizes__item active">32</div>
						<div className="product__sizes__item">34</div>
						<div className="product__sizes__item">36</div>
						<div className="product__sizes__item">38</div>
					</div>
					<div className="product__buttons">
						<button className="btn btn__primary">Add to cart</button>
						<button className="btn btn__secondary">Save to favorites</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default Product;
