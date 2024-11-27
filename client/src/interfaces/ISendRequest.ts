interface ISendRequest {
	route: string;
	method: 'get' | 'post' | 'patch';
	token?: string;
	body?: object;
}

export default ISendRequest;
