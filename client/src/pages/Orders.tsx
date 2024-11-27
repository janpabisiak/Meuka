import OrderList from '../components/order/OrderList';
import useAuthVerify from '../hooks/useAuthVerify';

function Orders() {
	useAuthVerify(true);

	return (
		<main className="orders">
			<OrderList />
		</main>
	);
}

export default Orders;
