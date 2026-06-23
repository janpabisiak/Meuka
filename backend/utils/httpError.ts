export enum HttpResponseStatuses {
	BadRequest = 400,
	NotAuthorized = 401,
	AccessDenied = 403,
	NotFound = 404,
	InternalServerError = 500,
}

export enum HttpResponseTypes {
	Success = 'success',
	Failed = 'failed',
	Error = 'error',
}

export class HttpError extends Error {
	public type: HttpResponseStatuses;
	public status: HttpResponseTypes;
	public message: string;
	private defaultMessages: Record<HttpResponseStatuses, string> = {
		[HttpResponseStatuses.BadRequest]: 'Bad request.',
		[HttpResponseStatuses.AccessDenied]: 'Access denied.',
		[HttpResponseStatuses.NotAuthorized]: 'Not authorized.',
		[HttpResponseStatuses.NotFound]: 'Not found.',
		[HttpResponseStatuses.InternalServerError]: 'Unexpected server error.',
	};

	constructor(type: HttpResponseStatuses, status: HttpResponseTypes, message?: string) {
		super();

		this.type = type;
		this.status = status;
		this.message = message ?? this.defaultMessages[type];
	}
}
