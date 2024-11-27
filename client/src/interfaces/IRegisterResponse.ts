interface IRegisterResponse {
	token: string;
	data: {
		_id: string;
		firstName: string;
		lastName: string;
		email: string;
	};
}

export default IRegisterResponse;
