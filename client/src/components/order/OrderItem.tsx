import { Link } from 'react-router-dom';
import IOrder from '../../interfaces/IOrder';

interface Props {
	order: IOrder;
}

function OrderItem({ order }: Props) {
	const title =
		order.products
			.map((item) => item.title)
			.join(', ')
			.slice(0, 37) + '...';
	const date = new Date(order.date!);

	return (
		<Link to={`../order/${order._id}`}>
			<div className="orders__item" key={order._id}>
				<div className="orders__content">
					<h3 className="orders__content__title">{title}</h3>
					<span className="orders__content__no-items">{order.products.length} items</span>
					<span className="orders__content__date">{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</span>
				</div>
				<div className="orders__content__details">
					<h5 className="orders__content__price">{order.total} $</h5>
				</div>
			</div>
		</Link>
	);
}

export default OrderItem;
