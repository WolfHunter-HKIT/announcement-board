import bcrypt from 'bcrypt';

const CompareHash = async (plaintext, hash) => {
	try {
		return await bcrypt.compare(plaintext, hash);
	} catch (err) {
		console.error('Error comparing password hashes:', err);
		return false;
	}
};

export default CompareHash;
