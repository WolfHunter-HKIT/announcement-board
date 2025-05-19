import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signupPage.css';

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
			<form className='signup-form'>
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
