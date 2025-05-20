import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signupPage.css';
import axios from 'axios';
import VerifyPassword from '../auth/VerifyPassword';

const SignupPage = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState({
		content: '',
		reveal: 'password',
		buttonState: 'Show',
	});
	const [passwordConfirm, setPasswordConfirm] = useState({
		content: '',
		reveal: 'password',
		buttonState: 'Show',
	});
	const navigate = useNavigate();

	const handleSingup = async (e) => {
		e.preventDefault();
		console.log(password.content, passwordConfirm.content);
		if (password.content === passwordConfirm.content) {
			const user = {
				displayName: username,
				email: email,
				password: password.content,
			};
			await axios
				.post('http://localhost:3000/users', user)
				.then((res) => {})
				.catch((error) => {
					console.error('Error creating user:', error);
				});
			await axios.post('http://localhost:3000/verify', {
				email: email,
				password: password.content,
			})
			navigate('/')
		}
	};

	const togglePassword = () => {
		setPassword((prev) => ({
			...prev,
			reveal: prev.reveal === 'password' ? 'text' : 'password',
			buttonState: prev.buttonState === 'Show' ? 'Hide' : 'Show',
		}));
	};
	const togglePasswordConfirm = () => {
		setPasswordConfirm((prev) => ({
			...prev,
			reveal: prev.reveal === 'password' ? 'text' : 'password',
			buttonState: prev.buttonState === 'Show' ? 'Hide' : 'Show',
		}));
	};

	return (
		<div className='signup-card auth-card'>
			<h1 className='signup-title'>Create an Account</h1>
			<form className='signup-form' onSubmit={handleSingup}>
				<label htmlFor='username'>Username</label>
				<input type='text' id='username' placeholder='yourname' value={username} onChange={(e) => setUsername(e.target.value)} required />

				<label htmlFor='email'>Email</label>
				<input type='email' id='email' placeholder='you@example.com' value={email} onChange={(e) => setEmail(e.target.value)} required />

				<label htmlFor='password'>Password</label>
				<div className='password-wrapper'>
					<input
						type={password.reveal}
						id='password'
						placeholder='••••••••'
						value={password.content}
						onChange={(e) => setPassword((prev) => ({ ...prev, content: e.target.value }))}
						required
					/>
					<span className='toggle-password' onClick={togglePassword}>
						{password.buttonState}
					</span>
				</div>

				<label htmlFor='passwordConfirm'>Confirm Password</label>
				<div className='password-wrapper'>
					<input
						type={passwordConfirm.reveal}
						id='passwordConfirm'
						placeholder='••••••••'
						value={passwordConfirm.content}
						onChange={(e) => setPasswordConfirm((prev) => ({ ...prev, content: e.target.value }))}
						required
					/>
					<span className='toggle-password' onClick={togglePasswordConfirm}>
						{passwordConfirm.buttonState}
					</span>
				</div>

				<button type='submit'>Sign Up</button>
			</form>
			<p className='login-text'>
				Already have an account? <Link to={'/login'}>Log in</Link>
			</p>
		</div>
	);
};

export default SignupPage;
