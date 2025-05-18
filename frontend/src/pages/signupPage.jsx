import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signupPage.css';

const SignupPage = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordReveal, setPasswordReveal] = useState('password');
	const [passwordButton, setPasswordButton] = useState('Show');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmReveal, setPasswordConfirmReveal] = useState('password');
	const [passwordConfirmButton, setPasswordConfirmButton] = useState('Show');

	const togglePassword = () => {
		setPasswordReveal((prev) => (prev === 'password' ? 'text' : 'password'));
		setPasswordButton((prev) => (prev === 'Show' ? 'Hide' : 'Show'));
	};
	const togglePasswordConfirm = () => {
		setPasswordConfirmReveal((prev) => (prev === 'password' ? 'text' : 'password'));
		setPasswordConfirmButton((prev) => (prev === 'Show' ? 'Hide' : 'Show'));
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
					<input type={passwordReveal} id='password' placeholder='••••••••' value={password} onChange={(e) => setPassword(e.target.value)} required />
					<span className='toggle-password' onClick={togglePassword}>
						{passwordButton}
					</span>
				</div>

				<label htmlFor='passwordConfirm'>Confirm Password</label>
				<div className='password-wrapper'>
					<input type={passwordConfirmReveal} id='passwordConfirm' placeholder='••••••••' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
					<span className='toggle-password' onClick={togglePasswordConfirm}>
						{passwordConfirmButton}
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
