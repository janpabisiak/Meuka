import { PAGINATION_LIMIT } from '../config';
import { IHttpRequest } from '../types/IHttpRequest';
import { IPagination } from '../types/IPagination';
import { HttpError, HttpResponseStatuses, HttpResponseTypes } from './httpError';

const PAGINATION_OFFSET = 0;

export const parsePagination = (req: IHttpRequest): IPagination => {
	const { limit: rawLimit = PAGINATION_LIMIT, offset: rawOffset = PAGINATION_OFFSET } = req.query;

	if (isNaN(Number(rawLimit)) || isNaN(Number(rawOffset))) {
		throw new HttpError(
			HttpResponseStatuses.BadRequest,
			HttpResponseTypes.Failed,
			'At least one of pagination properties is incorrect',
		);
	}

	const limit = Number(rawLimit) || PAGINATION_LIMIT;
	const offset = Number(rawOffset);

	return {
		limit,
		offset,
	};
};
