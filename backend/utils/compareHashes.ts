import bcrypt from 'bcrypt';

// Function to compare the password input with the hashed password stored in the database.
const compareHashes = async (passwordInput: string, dbPassHash: string) => {
	return await bcrypt.compare(passwordInput, dbPassHash);
};

export default compareHashes;
