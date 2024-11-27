import { useNavigate, useParams } from 'react-router-dom';
import OrderDetails from '../components/order/OrderDetails';
import useAuthVerify from '../hooks/useAuthVerify';
import { useEffect, useState } from 'react';
import IOrder from '../interfaces/IOrder';
import toast from 'react-hot-toast';
import sendRequest from '../utils/sendRequest';

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
				const response = await sendRequest({ route: `/orders/${id}`, method: 'get', token: String(localStorage.getItem('token')) });
				setOrder(response.data.data);
			} catch (err) {
				toast.error(err.message);
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
