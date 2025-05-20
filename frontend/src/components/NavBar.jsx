import { useEffect, useState } from 'react';
import VerifyLogin from '../auth/VerifyLogin';
import '../styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../auth/Logout';

const NavBar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = async () => {
			const data = await VerifyLogin();
			if (data.user !== null) {
				setIsLoggedIn(data.success);
				setIsAdmin(data.user.isAdmin);
			}
		};
		checkUser();
	}, []);

	const handleLogout = async () => {
		Logout();
		setIsLoggedIn(false);
		navigate('/login');
	};

	return (
		<nav className='navbar'>
			<div className='nav-brand'>MyApp</div>
			<ul className='nav-links'>
				<li style={{ display: isAdmin ? 'block' : 'none' }}>
					<Link to={'/admin'}>Admin Panel</Link>
				</li>
				{!isLoggedIn && (
					<>
						<li>
							<Link to={'/login'}>Log In</Link>
						</li>
						<li>
							<Link to={'/signup'}>Sign Up</Link>
						</li>
					</>
				)}
				{isLoggedIn && (
					<li>
						<button className='logout-btn' onClick={handleLogout}>
							Log Out
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;
