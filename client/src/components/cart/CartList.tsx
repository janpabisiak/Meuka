import toast from 'react-hot-toast';
import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { useUser } from '../../contexts/userContext';
import IProduct from '../../interfaces/IProduct';

interface Props {
	selectedProducts: IProduct[];
	total: number;
}

function CartList({ selectedProducts, total }: Props) {
	const { dispatch } = useUser();

	function handleDeleteItem(id: number) {
		dispatch({ type: 'cart/delete', payload: id });
		toast.success('Item removed from the cart.');
	}

	return (
		<div className="cart__products">
			{selectedProducts.map((product, i) => (
				<CartItem key={i} product={product} id={i} onDeleteItem={handleDeleteItem} />
			))}
			<CartTotal total={total} />
		</div>
	);
}

export default CartList;
