import { useEffect, useState } from 'react';
import axios from 'axios';

const instance = axios.create();
instance.defaults.timeout = 8000;

type method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function useFetch(url: string, method: method, body?: object) {
	const [data, setData] = useState<object | null>({});
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			const controller = new AbortController();

			try {
				setIsLoading(true);
				let response;
				if (method === 'GET') {
					response = await instance({
						method: 'get',
						url,
						signal: controller.signal,
					});
				} else {
					response = await instance({
						method,
						url,
						data: body,
						signal: controller.signal,
					});
				}
				setData(response.data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err);
				}
			} finally {
				setIsLoading(false);
				controller.abort();
			}
		}

		fetchData();
	}, [url, body, method]);

	return { data, error, isLoading };
}

export default useFetch;
