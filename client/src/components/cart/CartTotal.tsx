interface Props {
	total: number;
}

function CartTotal({ total }: Props) {
	return (
		<h3 className="cart__products__total">
			Total: <span className="cart__products__amount">{total} $</span>
		</h3>
	);
}

export default CartTotal;
