export interface IHttpResponse {
	status: string;
	message: string;
	data?: unknown;
	total?: number;
	token?: string;
}
