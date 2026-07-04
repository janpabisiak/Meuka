interface IProps {
	page: number;
	isCurrent: boolean;
	handlePageChange: (page: number) => void;
}

function PaginationItem({ page, isCurrent, handlePageChange }: IProps) {
	return (
		<li className={`pagination__item ${isCurrent ? 'active' : ''}`} onClick={() => handlePageChange(page)}>
			{page}
		</li>
	);
}

export default PaginationItem;
