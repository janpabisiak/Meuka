function Color({ bgColor }: { bgColor: string }) {
	return <div className="product__colors__item" style={{ backgroundColor: bgColor }}></div>;
}

export default Color;
