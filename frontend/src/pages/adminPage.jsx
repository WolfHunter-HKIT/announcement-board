import { useEffect } from 'react';
import '../styles/adminPage.css';
import VerifyLogin from '../auth/VerifyLogin';

const AdminPage = () => {
	useEffect(() => {
		const checkAdmin = async () => {
			const data = await VerifyLogin();
			if (data.user.isAdmin) {
				console.log('Is Admin');
			}
		};
		checkAdmin();
	}, []);
	return <div>AdminPage</div>;
};

export default AdminPage;
