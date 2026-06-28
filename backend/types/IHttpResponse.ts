export interface IHttpResponse {
	status: string;
	message: string;
	data?: unknown;
	token?: string;
}
