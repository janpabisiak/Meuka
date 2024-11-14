import { useUser } from '../contexts/userContext';

function Orders() {
	const { orders } = useUser();

	return (
		<main className="orders">
			<div className="orders__list">
				<div className="orders__list__item">
					<h3 className="orders__list__item__title"></h3>
				</div>
				<div className="orders__list__item">
					<div className="orders__list__item__content">
						<h3 className="orders__list__item__content__title">dwafwafwa</h3>
						<span className="orders__list__item__content__noItems">421 items</span>
					</div>
					<div className="cart__products__item__details">
						<h5 className="cart__products__item__details__price">ge $</h5>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Orders;
