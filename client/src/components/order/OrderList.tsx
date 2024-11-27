import OrderItem from './OrderItem';
import { useUser } from '../../contexts/userContext';

function OrderList() {
	const {
		state: { orders },
	} = useUser();

	if (!orders.length) {
		return <h1>No data to display.</h1>;
	}

	return (
		<div className="orders__list">
			{orders.map((order) => (
				<OrderItem key={order._id} order={order} />
			))}
		</div>
	);
}

export default OrderList;
