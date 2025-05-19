import '../styles/navbar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav class='navbar'>
			<div class='nav-brand'>MyApp</div>
			<ul class='nav-links'>
				<li>
					<Link to={'/'}>Home</Link>
				</li>
				<li>
					<Link to={'/login'}>Log In</Link>
				</li>
				<li>
					<Link to={'/signup'}>Sign Up</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
