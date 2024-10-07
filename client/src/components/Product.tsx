import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Product() {
	const { id: productID } = useParams();
	const { data, error, isLoading } = useFetch('http://localhost:3000/api/products/' + productID, 'GET');
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
				imgElement.removeEventListener('mousemove', handleMouseMove);
			};
		}
	}, [data]);

	return (
		<main className="product">
			{isLoading && <h1>Loading...</h1>}
			{error && <h1>Error: {error.message}</h1>}
			{data && data.data ? (
				<>
					<div className="product__image">
						{data.data.images.length > 0 && <img src={data.data.images[0]} ref={img} alt={data.data.title} />}
					</div>
					<div className="product__content">
						<h2 className="product__title">{data.data.title}</h2>
						<span className="product__price">{data.data.price} USD</span>
						<p className="product__description">{data.data.description}</p>
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
				</>
			) : (
				<h1>No product found.</h1>
			)}
		</main>
	);
}

export default Product;
