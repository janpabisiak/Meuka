import bcrypt from 'bcrypt';

// Function to hash the password using bcrypt
const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export default hashPassword;
