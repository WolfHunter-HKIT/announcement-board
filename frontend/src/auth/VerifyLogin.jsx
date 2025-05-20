import axios from 'axios';

const VerifyLogin = async () => {
	try {
		const res = await axios.get('http://localhost:3000/protected');
		return res.data;
	} catch (err) {
		console.warn('User not logged in or token invalid:', err.response?.data || err.message);
		return { user: null, isLoggedIn: false };
	}
};

export default VerifyLogin;
