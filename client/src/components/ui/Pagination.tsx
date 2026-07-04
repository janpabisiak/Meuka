import PaginationItem from './PaginationItem';

interface IProps {
	currentPage: number;
	maxPage: number;
	handlePageChange: (page: number) => void;
}

function Pagination({ currentPage, maxPage, handlePageChange }: IProps) {
	const pages = Array.from({ length: maxPage }, (_, i) => i + 1).filter((page) => Math.abs(currentPage - page) < 3);

	if (pages.length < 2) {
		return;
	}

	return (
		<div className="pagination">
			<ul className="pagination__list">
				{pages.map((page) => (
					<PaginationItem page={page} isCurrent={currentPage === page} handlePageChange={handlePageChange} key={page} />
				))}
			</ul>
		</div>
	);
}

export default Pagination;
