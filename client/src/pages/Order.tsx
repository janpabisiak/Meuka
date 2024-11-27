import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import OrderDetails from '../components/order/OrderDetails';
import useAuthVerify from '../hooks/useAuthVerify';
import sendRequest from '../utils/sendRequest';
import IOrder from '../interfaces/IOrder';

function Order() {
	useAuthVerify();
	const { id } = useParams();
	const navigate = useNavigate();
	const [order, setOrder] = useState<IOrder>();

	// Redirect if no order id
	useEffect(() => {
		if (!id) {
			navigate('../');
			return;
		}
	});

	// Fetch order details
	useEffect(() => {
		async function fetchData() {
			try {
				const response: { data: { data: IOrder } } = await sendRequest({
					route: `/orders/${id}`,
					method: 'get',
					token: String(localStorage.getItem('token')),
				});
				setOrder(response.data.data);
			} catch (err) {
				if (err instanceof AxiosError) toast.error(err.message);
				else toast.error('Failed to fetch order details');
				navigate('../');
			}
		}

		fetchData();
	}, [id, navigate]);

	return (
		<main className="orders">
			<OrderDetails order={order} />
		</main>
	);
}

export default Order;
