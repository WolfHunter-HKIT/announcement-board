import axios from 'axios';

const VerifyLogin = async () => {
	try {
		const res = await axios.get('http://localhost:3000/protected');
		return res.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

export default VerifyLogin;
