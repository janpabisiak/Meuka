import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

function ProductDetails({ children }: Props) {
	return <div className="product__content">{children}</div>;
}

export default ProductDetails;
