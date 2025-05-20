import axios from 'axios';

const FetchUsers = async () => {
	try {
		const res = await axios.get('http://localhost:3000/users');
		return res.data;
	} catch (error) {
		console.error('Error fetching users:', error);
		return [];
	}
};

export default FetchUsers;
