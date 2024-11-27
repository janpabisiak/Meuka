import IProduct from './IProduct';

interface ICartProduct extends IProduct {
	selectedColor: string;
	selectedSize: string;
}

export default ICartProduct;
