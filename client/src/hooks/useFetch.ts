import { useEffect, useState } from 'react';

type method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function useFetch(url: string, method: method, body?: object) {
	const [data, setData] = useState<object | null>({});
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			try {
				setIsLoading(true);
				let response;
				if (method === 'GET') {
					response = await fetch(url);
				} else {
					response = await fetch(url, {
						method: method.toUpperCase(),
						body: JSON.stringify(body),
						headers: { 'Content-Type': 'application/json' },
					});
				}

				if (!response.ok) {
					throw new Error('HTTP error! Status: ' + response.status);
				}

				const data = await response.json();
				setData(data);
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError(err);
				}
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [url, body, method]);

	return { data, error, isLoading };
}

export default useFetch;
