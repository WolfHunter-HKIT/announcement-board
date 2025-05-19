import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';

axios.defaults.withCredentials = true;

// Routes
import LandingPage from './pages/landingPage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import AdminPage from './pages/adminPage';
import axios from 'axios';

export const database = 'http://localhost:3000/';

const container = document.getElementById('root');

if (!container._root) {
	container._root = createRoot(container);
}

container._root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<LandingPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/signup' element={<SignupPage />} />
			<Route path='/admin' element={<AdminPage />} />
		</Routes>
	</BrowserRouter>
);
