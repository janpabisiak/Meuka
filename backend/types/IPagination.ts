export interface IPagination {
	limit: number;
	offset: number;
}

export interface IPaginationDto<T> {
	data: T[];
	total: number;
}
