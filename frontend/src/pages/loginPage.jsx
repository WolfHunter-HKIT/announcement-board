import { useEffect } from 'react';
import '../styles/loginPage.css';
import FetchAll from '../sql/FetchAll';

const LoginPage = () => {
	useEffect(() => {
		const fetchData = async () => {
			const data = await FetchAll('users');
			console.log(data);
		};

		fetchData();
	}, []);

	return <div>loginPage</div>;
};

export default LoginPage;
