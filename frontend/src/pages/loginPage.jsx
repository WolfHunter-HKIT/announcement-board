import { useEffect, useState } from 'react';
// import CompareHash from '../../../backend/auth/CompareHash';
import '../styles/loginPage.css';
import '../styles/index.css';
import FetchAll from '../sql/FetchAll';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VerifyPassword from '../auth/VerifyPassword';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordReveal, setPasswordReveal] = useState('password');
	const [passwordButton, setPasswordButton] = useState('Show');

	useEffect(() => {
		const fetchData = async () => {
			const data = await FetchAll('users');
			console.log(data);
		};

		fetchData();
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();

		await VerifyPassword(email, password);
	};

	const togglePassword = () => {
		setPasswordReveal((prev) => (prev === 'password' ? 'text' : 'password'));
		setPasswordButton((prev) => (prev === 'Show' ? 'Hide' : 'Show'));
	};

	return (
		<div className='login-card auth-card'>
			<h1 className='login-title'>Log In</h1>
			<form className='login-form' onSubmit={handleLogin}>
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' placeholder='you@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />

				<label htmlFor='password'>Password</label>
				<div className='password-wrapper'>
					<input type={passwordReveal} id='password' placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)} required />
					<span className='toggle-password' onClick={togglePassword}>
						{passwordButton}
					</span>
				</div>

				<button type='submit'>Login</button>
			</form>
			<p className='signup-text'>
				Don't have an account? <Link to={'/signup'}>Sign up</Link>
			</p>
		</div>
	);
};

export default LoginPage;
