import axios from 'axios';

const Logout = () => {
	axios.post('http://localhost:3000/logout');
	// return <div>Logout</div>;
};

export default Logout;
