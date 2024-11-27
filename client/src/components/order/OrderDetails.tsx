import { Link } from 'react-router-dom';
import IOrder from '../../interfaces/IOrder';

interface Props {
	order?: IOrder;
}

function OrderDetails({ order }: Props) {
	if (order) {
		const date = new Date(order.date!);
		return (
			<main className="cart">
				<form className="form">
					<h3 className="form__title">Order details</h3>
					<input className="input" type="text" value={order.firstName} disabled />
					<input className="input" type="text" value={order.lastName} disabled />
					<input className="input" type="text" value={order.address} disabled />
					<input className="input" type="text" value={order.city} disabled />
					<input className="input" type="text" value={order.country} disabled />
					<input className="input" type="text" value={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`} disabled />
				</form>
				<div className="cart__products">
					{order.products.map((item, i) => (
						<div className="cart__products__item" key={i}>
							<Link to={`../product/${item._id}`}>
								<div className="cart__products__item__image">
									<img src={item.images[0]} />
								</div>
							</Link>
							<div className="cart__products__item__content">
								<h3 className="cart__products__item__content__title">{item.title}</h3>
								<span className="cart__products__item__content__details">
									{item.selectedSize} {item.selectedColor}
								</span>
							</div>
							<div className="cart__products__item__details">
								<h5 className="cart__products__item__details__price">{item.price} $</h5>
							</div>
						</div>
					))}
					<h3 className="cart__products__total">
						Total: <span className="cart__products__amount">{order.total} $</span>
					</h3>
				</div>
			</main>
		);
	}

	return <h1>Loading order details...</h1>;
}

export default OrderDetails;
