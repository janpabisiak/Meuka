import axios, { AxiosResponse } from 'axios';

interface ISendRequest {
	route: string;
	method: 'get' | 'post' | 'patch';
	token?: string;
	body?: object;
}

// Function to send request to server in simpler way
async function sendRequest<T>({ route, method, token, body }: ISendRequest): Promise<AxiosResponse<T>> {
	try {
		const options = {
			url: import.meta.env.VITE_API_LINK + route,
			method,
			timeout: import.meta.env.VITE_API_TIMEOUT,
		};

		// Add token to headers if provided
		if (token) options.headers = { Authorization: `Bearer ${token}` };

		// Add body to request if provided and correct method is used
		if ((method === 'post' || method === 'patch') && body) {
			options.data = body;
		}

		const response = await axios(options);
		return response;
	} catch (err) {
		if (axios.isAxiosError(err)) {
			console.error('Axios error:', err.response?.data || err.message);
		} else {
			console.error('Unexpected error:', err);
		}
		throw err;
	}
}

export default sendRequest;
