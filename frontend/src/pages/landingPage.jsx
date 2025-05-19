import React, { useEffect } from 'react';
import '../styles/landingPage.css';
import Logout from '../auth/Logout';
import VerifyLogin from '../auth/VerifyLogin';
import NavBar from '../components/NavBar';

const LandingPage = () => {
	const handleLogout = () => {
		Logout();
		console.log('Logged out');
	};

	useEffect(() => {
		VerifyLogin();
	}, []);

	return (
		<div id='app'>
			<NavBar />
			<p>landingPage</p>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default LandingPage;
