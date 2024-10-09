import { ReactNode } from 'react';

function ProductDetails({ children }: { children: ReactNode }) {
	return <div className="product__content">{children}</div>;
}

export default ProductDetails;
