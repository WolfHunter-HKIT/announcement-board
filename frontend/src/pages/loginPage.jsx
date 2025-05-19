import { use, useEffect, useState } from 'react';
import '../styles/loginPage.css';
import FetchAll from '../sql/FetchAll';
import { Link, useNavigate } from 'react-router-dom';
import VerifyPassword from '../auth/VerifyPassword';

const LoginPage = () => {
	let navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState({
		content: '',
		reveal: 'password',
		buttonState: 'Show',
	});

	useEffect(() => {
		const fetchData = async () => {
			const data = await FetchAll('users');
			console.log(data);
		};

		fetchData();
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();
		const res = await VerifyPassword(email, password.content);
		console.log(res);
		if (res.data.success) {
			navigate('/');
		}
	};

	const togglePassword = () => {
		setPassword((prev) => ({
			...prev,
			reveal: prev.reveal === 'password' ? 'text' : 'password',
			buttonState: prev.buttonState === 'Show' ? 'Hide' : 'Show',
		}));
	};

	return (
		<div className='login-card auth-card'>
			<h1 className='login-title'>Log In</h1>
			<form className='login-form' onSubmit={handleLogin}>
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' placeholder='you@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />

				<label htmlFor='password'>Password</label>
				<div className='password-wrapper'>
					<input
						type={password.reveal}
						id='password'
						placeholder='••••••••'
						value={password.content}
						onChange={(e) =>
							setPassword((prev) => ({
								...prev,
								content: e.target.value,
							}))
						}
						required
					/>
					<span className='toggle-password' onClick={togglePassword}>
						{password.buttonState}
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
