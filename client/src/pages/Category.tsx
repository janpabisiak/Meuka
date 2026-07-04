import { useEffect, useRef, useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import ProductsItem from '../components/product/ProductsItem';
import Pagination from '../components/ui/Pagination';
import { useProduct } from '../contexts/productContext';
import IProduct from '../interfaces/IProduct';
import sendRequest from '../utils/sendRequest';

enum AvailableCategories {
	Men = 'men',
	Women = 'women',
	Kids = 'kids',
}

interface IGetAllResponse {
	data: IProduct[];
	total: number;
}

function Category() {
	const { category } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const {
		state: { products, total, isLoading },
		dispatch,
	} = useProduct();
	const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
	const previousCategoryRef = useRef(category);

	const page = Number(searchParams.get('page')) || 1;

	const maxPage = Math.ceil((total || 0) / 8);

	function changePage(page: number) {
		setSearchParams((prevParams) => {
			const nextParams = new URLSearchParams(prevParams);
			nextParams.set('page', String(page));
			return nextParams;
		});
	}

	useEffect(() => {
		if (previousCategoryRef.current !== category) {
			setSearchQuery('');
			setSearchParams((prevParams) => {
				const nextParams = new URLSearchParams(prevParams);
				nextParams.delete('search');
				nextParams.set('page', '1');
				return nextParams;
			});

			previousCategoryRef.current = category;
		}
	}, [category, setSearchParams]);

	useEffect(() => {
		if (!searchQuery && !searchParams.get('search')) return;

		const handler = setTimeout(() => {
			setSearchParams((prevParams) => {
				const nextParams = new URLSearchParams(prevParams);
				if (searchQuery) {
					nextParams.set('search', searchQuery);
				} else {
					nextParams.delete('search');
				}

				nextParams.set('page', '1');
				return nextParams;
			});
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [searchQuery, searchParams, setSearchParams]);

	useEffect(() => {
		async function fetchProducts() {
			dispatch({ type: 'products/isLoading', payload: true });

			try {
				const offset = (page - 1) * 8;
				let route = `/products?offset=${offset}`;

				if (category) {
					route += `&category=${category}`;
				}

				if (searchQuery) {
					route += `&search=${searchQuery}`;
				}

				const response = await sendRequest({ route, method: 'get' });

				if (response.status !== 200) {
					return;
				}

				const data = response.data as IGetAllResponse;
				const { data: products, total } = data;

				dispatch({ type: 'products/set', payload: { products, total } });
				dispatch({ type: 'products/isLoading', payload: false });
			} catch (error) {
				console.log('Failed to fetch products:', error);
			} finally {
				dispatch({ type: 'products/isLoading', payload: false });
			}
		}

		fetchProducts();
	}, [category, page, searchQuery, dispatch]);

	const hasInvalidCategory = category && !Object.values(AvailableCategories).includes(category as AvailableCategories);
	const hasInvalidPage = !isLoading && total > 0 && page > maxPage;

	if (hasInvalidCategory || hasInvalidPage) {
		return <Navigate to="../" replace />;
	}

	return (
		<main className="main">
			<input
				className="input products__search-bar"
				placeholder="Search products by name"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			{total ? (
				<>
					<div className="products">
						{products.map((product) => (
							<ProductsItem key={product._id} product={product} />
						))}
					</div>
					<Pagination currentPage={page} maxPage={maxPage} handlePageChange={changePage} />
				</>
			) : (
				<div className="products">
					<h1>No products available.</h1>
				</div>
			)}
		</main>
	);
}

export default Category;
