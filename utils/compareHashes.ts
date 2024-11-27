import bcrypt from 'bcrypt';

const compareHashes = async (passwordInput: string, dbPassHash: string) => {
	return await bcrypt.compare(passwordInput, dbPassHash);
};

export default compareHashes;
