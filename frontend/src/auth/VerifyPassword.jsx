import axios from 'axios';

const VerifyPassword = async (email, password) => {
	try {
		const response = await axios.post('http://localhost:3000/verify', {
			email,
			password,
		});

		console.log('Login success:', response.data);
	} catch (error) {
		if (error.response) {
			// Server responded with status outside 2xx
			console.error('Login failed:', error.response.data);
		} else {
			// Network or config error
			console.error('Error connecting to server:', error.message);
		}
	}
};

export default VerifyPassword;
